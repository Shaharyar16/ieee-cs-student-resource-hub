import type { FormDef, FormResponse, FormAnswer } from '@/types';
import { readJSON, writeJSON, makeId } from '@/utils/storage';
import { feedbackFormSeed } from '@/data/formSeed';

/**
 * Forms module backend (mock over localStorage, async + API-shaped). Admin
 * builds forms; students fill open ones; responses collect for the admin.
 * Swap the bodies for fetch() calls when the real backend/DB lands.
 */

const FORMS_KEY = 'ieeecs_forms';
const RESPONSES_KEY = 'ieeecs_form_responses';
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

function readForms(): FormDef[] {
  const existing = readJSON<FormDef[] | null>(FORMS_KEY, null);
  if (existing) return existing;
  writeJSON(FORMS_KEY, [feedbackFormSeed]);
  return [feedbackFormSeed];
}

function writeForms(forms: FormDef[]): void {
  writeJSON(FORMS_KEY, forms);
}

function readResponses(): FormResponse[] {
  return readJSON<FormResponse[]>(RESPONSES_KEY, []);
}

/** Admin-created forms first (newest -> oldest), the default form pinned last. */
function ordered(forms: FormDef[]): FormDef[] {
  const custom = forms
    .filter((f) => !f.isDefault)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const defaults = forms.filter((f) => f.isDefault);
  return [...custom, ...defaults];
}

export interface CreateFormInput {
  title: string;
  description: string;
  pages: FormDef['pages'];
}

export const formsService = {
  /** Open forms only — for the public/student side. */
  async listOpen(): Promise<FormDef[]> {
    await delay();
    return ordered(readForms()).filter((f) => f.status === 'open');
  },

  /** All forms incl. disabled — for the admin. */
  async listAll(): Promise<FormDef[]> {
    await delay();
    return ordered(readForms());
  },

  async get(id: string): Promise<FormDef | null> {
    await delay();
    return readForms().find((f) => f.id === id) ?? null;
  },

  async create(input: CreateFormInput): Promise<FormDef> {
    await delay();
    const form: FormDef = {
      id: makeId('form'),
      title: input.title.trim() || 'Untitled form',
      description: input.description.trim(),
      pages: input.pages,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    writeForms([form, ...readForms()]);
    return form;
  },

  async update(id: string, patch: Partial<Omit<FormDef, 'id'>>): Promise<FormDef> {
    await delay();
    const forms = readForms();
    const idx = forms.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error('Form not found.');
    forms[idx] = { ...forms[idx], ...patch };
    writeForms(forms);
    return forms[idx];
  },

  async setStatus(id: string, status: FormDef['status']): Promise<FormDef> {
    return this.update(id, { status });
  },

  async remove(id: string): Promise<void> {
    await delay();
    writeForms(readForms().filter((f) => f.id !== id));
  },

  async submitResponse(
    formId: string,
    answers: Record<string, FormAnswer>,
    fieldLabels: Record<string, string>,
    submittedBy?: string
  ): Promise<FormResponse> {
    await delay();
    const response: FormResponse = {
      id: makeId('resp'),
      formId,
      submittedBy,
      submittedAt: new Date().toISOString(),
      answers,
      fieldLabels,
    };
    writeJSON(RESPONSES_KEY, [response, ...readResponses()]);
    return response;
  },

  async listResponses(formId: string): Promise<FormResponse[]> {
    await delay();
    return readResponses().filter((r) => r.formId === formId);
  },

  responseCount(formId: string): number {
    return readResponses().filter((r) => r.formId === formId).length;
  },
};
