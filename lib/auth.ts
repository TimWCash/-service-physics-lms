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

  static login(email: string, name: string): User {
    const user: User = {
      id: Date.now().toString(),
      email,
      name,
      progress: {}
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  static logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  static updateProgress(activityId: string, completed: boolean, score?: number): void {
    const user = this.getUser();
    if (!user) return;

    user.progress[activityId] = {
      completed,
      score,
      completedAt: new Date().toISOString()
    };

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
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
