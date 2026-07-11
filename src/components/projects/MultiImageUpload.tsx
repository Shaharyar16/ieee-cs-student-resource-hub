import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImagePlus, X, Loader2 } from 'lucide-react';

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
}

/**
 * Downscale an image file to a JPEG data URL so a few screenshots fit
 * comfortably in localStorage. When a real backend arrives this is replaced by
 * an upload that returns a hosted URL — the value shape (string[]) stays the same.
 */
function downscale(file: File, maxDim = 1280, quality = 0.72): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas not supported'));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Could not read image'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.readAsDataURL(file);
  });
}

export default function MultiImageUpload({ value, onChange, max = 3 }: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canAdd = value.length < max;

  async function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      const room = max - value.length;
      const picked = Array.from(files)
        .filter((f) => f.type.startsWith('image/'))
        .slice(0, room);
      const urls = await Promise.all(picked.map((f) => downscale(f)));
      onChange([...value, ...urls]);
    } catch {
      setError('Sorry, one of those images could not be processed.');
    } finally {
      setBusy(false);
    }
  }

  const remove = (idx: number) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <AnimatePresence initial={false}>
          {value.map((url, idx) => (
            <motion.div
              key={url.slice(-24) + idx}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-black/10"
            >
              <img src={url} alt={`Screenshot ${idx + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(idx)}
                className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ieee-ink/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed p-2 text-center transition ${
              dragOver ? 'border-ieee-orange bg-ieee-orange/5' : 'border-slate-300 bg-slate-50 hover:border-ieee-orange/60'
            }`}
          >
            {busy ? (
              <Loader2 className="h-5 w-5 animate-spin text-ieee-orange" />
            ) : (
              <ImagePlus className="h-5 w-5 text-slate-400" />
            )}
            <span className="text-[11px] font-medium text-slate-500">Add</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <p className="mt-2 text-xs text-slate-400">
        {value.length}/{max} images · auto-compressed to keep things fast
      </p>
      {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
    </div>
  );
}
