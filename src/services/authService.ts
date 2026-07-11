import type { User } from '@/types';
import { readJSON, writeJSON, makeId } from '@/utils/storage';

/**
 * Mock authentication backed by localStorage. Every method is async and returns
 * the same shapes a real REST endpoint would, so wiring a real backend later is
 * a matter of replacing the bodies with `fetch` calls — no consumer changes.
 *
 * NOTE: this is a prototype. Passwords are lightly obfuscated, NOT securely
 * hashed. Real auth (hashing, tokens, httpOnly cookies) lands with the backend.
 */

const USERS_KEY = 'ieeecs_users';
const SESSION_KEY = 'ieeecs_session';

interface StoredUser extends User {
  password: string;
}

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

function getUsers(): StoredUser[] {
  return readJSON<StoredUser[]>(USERS_KEY, []);
}

function toPublic({ password: _password, ...user }: StoredUser): User {
  void _password;
  return user;
}

export interface SignupInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class AuthError extends Error {}

export const authService = {
  /** Synchronous read of the persisted session for first paint (no flash). */
  getCurrentUser(): User | null {
    const id = readJSON<string | null>(SESSION_KEY, null);
    if (!id) return null;
    const user = getUsers().find((u) => u.id === id);
    return user ? toPublic(user) : null;
  },

  async signup({ name, email, password }: SignupInput): Promise<User> {
    await delay();
    const normalized = email.trim().toLowerCase();
    if (!name.trim()) throw new AuthError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) throw new AuthError('Enter a valid email address.');
    if (password.length < 8) throw new AuthError('Password must be at least 8 characters long.');
    if (!/[0-9]/.test(password)) throw new AuthError('Password must include at least one number.');
    if (!/[^A-Za-z0-9]/.test(password)) throw new AuthError('Password must include at least one special character.');

    const users = getUsers();
    if (users.some((u) => u.email === normalized)) {
      throw new AuthError('An account with this email already exists.');
    }

    const user: StoredUser = {
      id: makeId('user'),
      name: name.trim(),
      email: normalized,
      avatar: '',
      createdAt: new Date().toISOString(),
      password: btoa(password),
    };
    writeJSON(USERS_KEY, [user, ...users]);
    writeJSON(SESSION_KEY, user.id);
    return toPublic(user);
  },

  async login({ email, password }: LoginInput): Promise<User> {
    await delay();
    const normalized = email.trim().toLowerCase();
    const user = getUsers().find((u) => u.email === normalized);
    if (!user || user.password !== btoa(password)) {
      throw new AuthError('Incorrect email or password.');
    }
    writeJSON(SESSION_KEY, user.id);
    return toPublic(user);
  },

  logout(): void {
    writeJSON<string | null>(SESSION_KEY, null);
  },
};
