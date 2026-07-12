import type { AdminUser } from '@/types';
import { adminUsers as seedAdminUsers } from '@/data/adminUsers';
import { readJSON, writeJSON } from '@/utils/storage';
import { readCollection } from '@/services/store';

/** Read the live admin-users collection so people invited from the panel can log in. */
const getAdmins = (): AdminUser[] => readCollection<AdminUser>('adminUsers', seedAdminUsers);

/**
 * Admin (team) authentication — completely separate from student accounts.
 * Prototype: validates against the seeded team list + a shared demo password
 * and keeps an admin session in localStorage. Swap the body of loginAdmin for a
 * real API call (hashed creds, server session, roles) when the backend lands;
 * the guard and pages don't change.
 *
 * The portal itself lives at an unlisted URL (/portal) that is never linked
 * from the public hub — this login is the lock behind that private door.
 */

const SESSION_KEY = 'ieeecs_admin_session';
// Prototype-only shared password. Replace with per-account hashed credentials.
const DEMO_PASSWORD = 'ieeecs';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

export class AdminAuthError extends Error {}

export const adminAuthService = {
  getCurrentAdmin(): AdminUser | null {
    const id = readJSON<string | null>(SESSION_KEY, null);
    if (!id) return null;
    return getAdmins().find((u) => u.id === id) ?? null;
  },

  async loginAdmin(email: string, password: string): Promise<AdminUser> {
    await delay();
    const admin = getAdmins().find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!admin || password !== DEMO_PASSWORD) {
      throw new AdminAuthError('Invalid team credentials.');
    }
    writeJSON(SESSION_KEY, admin.id);
    return admin;
  },

  logoutAdmin(): void {
    writeJSON<string | null>(SESSION_KEY, null);
  },
};
