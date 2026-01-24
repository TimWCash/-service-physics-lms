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
    // Sign in anonymously with Supabase using email as unique identifier
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously({
      options: {
        data: {
          email,
          full_name: name
        }
      }
    })

    if (authError || !authData.user) {
      // Fallback to localStorage if Supabase fails
      const user: User = {
        id: Date.now().toString(),
        email,
        name,
        progress: {}
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      return user;
    }

    // Create or update profile in database
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: authData.user.id,
        email,
        full_name: name,
        updated_at: new Date().toISOString()
      })

    const user: User = {
      id: authData.user.id,
      email,
      name,
      progress: {}
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  static async logout(): Promise<void> {
    await supabase.auth.signOut()
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
    const total = 13; // Total activities in the course

    return Math.round((completed / total) * 100);
  }
}
