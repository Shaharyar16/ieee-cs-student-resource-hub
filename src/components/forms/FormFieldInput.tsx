import { useRef, useState } from 'react';
import { Paperclip, X, Loader2 } from 'lucide-react';
import type { FormField, FormAnswer } from '@/types';
import { downscaleImage } from '@/utils/image';

interface Props {
  field: FormField;
  value: FormAnswer | undefined;
  onChange: (value: FormAnswer) => void;
  error?: boolean;
}

const inputBase =
  'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-ieee-orange/20';

export default function FormFieldInput({ field, value, onChange, error }: Props) {
  const border = error ? 'border-rose-400' : 'border-black/10 focus:border-ieee-orange';
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  switch (field.type) {
    case 'long-text':
      return (
        <textarea
          rows={4}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${inputBase} ${border} min-h-28 resize-y`}
        />
      );

    case 'email':
    case 'number':
    case 'date':
    case 'short-text':
      return (
        <input
          type={field.type === 'short-text' ? 'text' : field.type}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${inputBase} ${border}`}
        />
      );

    case 'dropdown':
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputBase} ${border}`}
        >
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o.id} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
      );

    case 'radio':
      return (
        <div className="flex flex-col gap-2">
          {field.options?.map((o) => (
            <label
              key={o.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                value === o.label ? 'border-ieee-orange bg-ieee-orange/5 text-slate-900' : 'border-black/10 text-slate-600 hover:border-ieee-orange/40'
              }`}
            >
              <input
                type="radio"
                name={field.id}
                checked={value === o.label}
                onChange={() => onChange(o.label)}
                className="accent-ieee-orange"
              />
              {o.label}
            </label>
          ))}
        </div>
      );

    case 'checkbox': {
      const arr = Array.isArray(value) ? value : [];
      const toggle = (label: string) =>
        onChange(arr.includes(label) ? arr.filter((v) => v !== label) : [...arr, label]);
      return (
        <div className="flex flex-col gap-2">
          {field.options?.map((o) => (
            <label
              key={o.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-2.5 text-sm transition ${
                arr.includes(o.label) ? 'border-ieee-orange bg-ieee-orange/5 text-slate-900' : 'border-black/10 text-slate-600 hover:border-ieee-orange/40'
              }`}
            >
              <input
                type="checkbox"
                checked={arr.includes(o.label)}
                onChange={() => toggle(o.label)}
                className="accent-ieee-orange"
              />
              {o.label}
            </label>
          ))}
        </div>
      );
    }

    case 'file':
      return (
        <div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={`flex w-full items-center gap-2 rounded-xl border-2 border-dashed px-4 py-3 text-sm transition ${
              error ? 'border-rose-400' : 'border-slate-300 hover:border-ieee-orange/60'
            } ${value ? 'text-slate-800' : 'text-slate-500'}`}
          >
            <Paperclip className="h-4 w-4 shrink-0 text-slate-400" />
            {value ? (value as string) : 'Choose a file…'}
          </button>
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onChange(f.name);
            }}
          />
        </div>
      );

    case 'image': {
      const url = (value as string) ?? '';
      return (
        <div>
          {url ? (
            <div className="relative inline-block">
              <img src={url} alt="Upload preview" className="h-40 rounded-xl border border-black/10 object-cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ieee-ink/70 text-white backdrop-blur"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-sm text-slate-500 transition ${
                error ? 'border-rose-400' : 'border-slate-300 hover:border-ieee-orange/60'
              }`}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin text-ieee-orange" /> : 'Upload an image'}
            </button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              setBusy(true);
              try {
                onChange(await downscaleImage(f));
              } finally {
                setBusy(false);
                e.target.value = '';
              }
            }}
          />
        </div>
      );
    }

    default:
      return null;
  }
}
