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
    const total = 17; // Total activities across all 7 modules (3+3+4+3+2+2+2)

    return Math.round((completed / total) * 100);
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
}
