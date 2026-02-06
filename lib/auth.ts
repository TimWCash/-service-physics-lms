import { supabase } from './supabase'

export interface User {
  id: string;
  email: string;
  name: string;
  progress: {
    [activityId: string]: {
      completed: boolean;
      score?: number;
      completedAt?: string;
    };
  };
  notes?: {
    [activityId: string]: string;
  };
  answers?: {
    [activityId: string]: {
      [questionId: string]: string;
    };
  };
}

export class AuthService {
  private static STORAGE_KEY = 'sp_lms_user';

  static getUser(): User | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem(this.STORAGE_KEY);
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static async login(email: string, name: string): Promise<User> {
    // Generate a consistent UUID based on email for tracking
    const userId = `user_${email.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;

    // Create or update profile in database (without Supabase Auth)
    try {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          email,
          full_name: name,
          updated_at: new Date().toISOString()
        })

      if (profileError) {
        console.error('Supabase profile error:', JSON.stringify(profileError))
      } else {
        console.log('Profile created successfully:', data)
      }
    } catch (err) {
      console.error('Exception creating profile:', err)
    }

    // Load existing progress from Supabase
    const progress: User['progress'] = {}
    try {
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('activity_id, completed, completed_at')
        .eq('user_id', userId)
        .eq('completed', true)

      if (progressError) {
        console.error('Error loading progress:', progressError)
      } else if (progressData) {
        progressData.forEach((item) => {
          progress[item.activity_id] = {
            completed: item.completed,
            completedAt: item.completed_at
          }
        })
        console.log('Loaded progress:', progressData.length, 'completed activities')
      }
    } catch (err) {
      console.error('Exception loading progress:', err)
    }

    const user: User = {
      id: userId,
      email,
      name,
      progress,
      notes: {}
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  static async logout(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static async updateProgress(activityId: string, completed: boolean, score?: number, sectionId?: string): Promise<void> {
    const user = this.getUser();
    if (!user) return;

    // Update local storage
    user.progress[activityId] = {
      completed,
      score,
      completedAt: new Date().toISOString()
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

    // Update Supabase database
    const { error } = await supabase
      .from('course_progress')
      .upsert({
        user_id: user.id,
        activity_id: activityId,
        section_id: sectionId || 'unknown',
        completed,
        score: score || null,
        completed_at: completed ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error updating progress in Supabase:', error)
    }
  }

  static getProgress(activityId: string) {
    const user = this.getUser();
    return user?.progress[activityId] || null;
  }

  static getCourseProgress(): number {
    const user = this.getUser();
    if (!user) return 0;

    const completed = Object.values(user.progress).filter(p => p.completed).length;
    const total = 31; // Total activities across all 7 modules (including 6 quizzes)

    const progress = Math.round((completed / total) * 100);
    return Math.min(progress, 100); // Cap at 100%
  }

  static saveNote(activityId: string, note: string): void {
    const user = this.getUser();
    if (!user) return;

    if (!user.notes) {
      user.notes = {};
    }

    user.notes[activityId] = note;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  static getNote(activityId: string): string {
    const user = this.getUser();
    return user?.notes?.[activityId] || '';
  }

  static saveAnswers(activityId: string, answers: { [questionId: string]: string }): void {
    const user = this.getUser();
    if (!user) return;

    if (!user.answers) {
      user.answers = {};
    }

    user.answers[activityId] = answers;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  static getAnswers(activityId: string): { [questionId: string]: string } {
    const user = this.getUser();
    return user?.answers?.[activityId] || {};
  }

  static getAllAnswers(): { [activityId: string]: { [questionId: string]: string } } {
    const user = this.getUser();
    return user?.answers || {};
  }

  // Sync progress from Supabase to localStorage
  static async syncFromSupabase(): Promise<void> {
    const user = this.getUser();
    if (!user) return;

    try {
      const { data: progressData, error: progressError } = await supabase
        .from('course_progress')
        .select('activity_id, completed, completed_at, score')
        .eq('user_id', user.id)
        .eq('completed', true)

      if (progressError) {
        console.error('Error syncing progress:', progressError)
        return;
      }

      if (progressData) {
        // Reset progress and rebuild from Supabase (source of truth)
        const newProgress: User['progress'] = {};
        progressData.forEach((item) => {
          newProgress[item.activity_id] = {
            completed: item.completed,
            completedAt: item.completed_at,
            score: item.score
          }
        });

        // Update localStorage with synced data
        user.progress = newProgress;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
        console.log('Synced progress from Supabase:', progressData.length, 'completed activities')
      }
    } catch (err) {
      console.error('Exception syncing progress:', err)
    }
  }
}
