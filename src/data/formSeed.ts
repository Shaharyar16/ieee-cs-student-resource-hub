import type { FormDef } from '@/types';

/** The default Feedback form that ships with the site. Admin-created forms
 *  appear above it; it stays pinned at the bottom of the list. */
export const feedbackFormSeed: FormDef = {
  id: 'form-feedback',
  title: 'Feedback Form',
  description: 'We build this hub for you — tell us what you love and what we can do better.',
  status: 'open',
  createdAt: '2026-01-01T00:00:00.000Z',
  isDefault: true,
  pages: [
    {
      id: 'fp-1',
      fields: [
        {
          id: 'ff-name',
          type: 'short-text',
          label: 'Name',
          placeholder: 'Your name (optional)',
          required: false,
        },
        {
          id: 'ff-feedback',
          type: 'long-text',
          label: 'Your Feedback',
          description: 'Share suggestions, issues, or anything on your mind about the hub.',
          placeholder: 'Type your feedback here…',
          required: true,
        },
      ],
    },
  ],
};
