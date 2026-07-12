import type { AdminUser } from '@/types';
import { adminUsers as seedAdminUsers } from '@/data/adminUsers';
import { readCollection } from '@/services/store';

/** Read the live admin-users collection so people invited from the panel can log in. */
const getAdmins = (): AdminUser[] => readCollection<AdminUser>('adminUsers', seedAdminUsers);

/**
 * Admin (team) authentication — completely separate from student accounts.
 *
 * The session lives in sessionStorage (NOT localStorage), so it is cleared the
 * moment the tab/browser is closed. Every fresh visit to /portal therefore
 * requires logging in again — typing /portal/dashboard directly bounces to the
 * login screen. Swap the body of loginAdmin for a real API call when the
 * backend lands; the guard and pages don't change.
 *
 * The portal itself lives at an unlisted URL (/portal) never linked publicly.
 */

const SESSION_KEY = 'ieeecs_admin_session';
// Prototype-only shared password. Replace with per-account hashed credentials.
const DEMO_PASSWORD = 'ieeecs';

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

function readSession(): string | null {
  try {
    return sessionStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
}
function writeSession(id: string): void {
  try {
    sessionStorage.setItem(SESSION_KEY, id);
  } catch {
    /* ignore */
  }
}
function clearSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export class AdminAuthError extends Error {}

export const adminAuthService = {
  getCurrentAdmin(): AdminUser | null {
    const id = readSession();
    if (!id) return null;
    return getAdmins().find((u) => u.id === id) ?? null;
  },

  async loginAdmin(email: string, password: string): Promise<AdminUser> {
    await delay();
    const admin = getAdmins().find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!admin || password !== DEMO_PASSWORD) {
      throw new AdminAuthError('Invalid team credentials.');
    }
    writeSession(admin.id);
    return admin;
  },

  logoutAdmin(): void {
    clearSession();
  },
};
