import { useLayoutEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';
import type { NavLinkItem } from '@/types';

const gradient = 'bg-gradient-to-br from-[#141109] via-[#1b1e26] to-[#20232b]';
/** Don't shrink below this — past here we let it scroll so text stays readable. */
const MIN_SCALE = 0.6;

/**
 * A faithful replica of the public laptop navbar. It's laid out at real
 * proportions (the white pill hugs its contents so nothing ever overflows it),
 * then uniformly scaled down to fit whatever width the admin panel gives it.
 * On a laptop it fits with no scrollbar; only on a phone-sized panel does it
 * hit the minimum scale and become horizontally scrollable.
 */
export default function NavbarPreview({ links }: { links: NavLinkItem[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ scale: 1, w: 0, h: 0 });
  const empty = links.length === 0;

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;
    const measure = () => {
      const natW = content.offsetWidth; // natural width (transform doesn't affect this)
      const natH = content.offsetHeight;
      const avail = wrap.clientWidth;
      const scale = Math.min(1, Math.max(MIN_SCALE, avail / natW));
      setDims({ scale, w: natW, h: natH });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [links]);

  const { scale, w, h } = dims;

  return (
    <div>
      <p className="mb-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        Navbar preview
        <span className="font-sans text-[10px] normal-case text-slate-300">· how it looks on a laptop</span>
      </p>
      <div ref={wrapRef} className={`overflow-x-auto overflow-y-hidden rounded-2xl ${gradient}`}>
        <div className="mx-auto" style={{ width: w ? w * scale : undefined, height: h ? h * scale : undefined }}>
          <div
            ref={contentRef}
            className="p-5"
            style={{ width: 'max-content', transform: `scale(${scale})`, transformOrigin: 'top left' }}
          >
            <div className="flex w-max items-center rounded-2xl border border-black/5 bg-white/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="flex shrink-0 items-center gap-2.5">
                <BrandLogo className="h-9 w-9" />
                <span className="font-display text-sm font-bold tracking-tight text-slate-900">IEEE CS Hub</span>
              </div>

              <div className="w-14 shrink-0" />

              <nav className="flex flex-nowrap items-center gap-1 whitespace-nowrap">
                {empty ? (
                  <span className="px-2 text-sm italic text-slate-400">No links enabled</span>
                ) : (
                  links.map((l, i) => (
                    <span
                      key={l.id}
                      className={`relative px-3 py-2 text-sm font-semibold ${i === 0 ? 'text-ieee-orange' : 'text-slate-600'}`}
                    >
                      {l.label}
                      {i === 0 && <span className="absolute -bottom-0.5 left-3 right-3 h-[3px] rounded-full bg-ieee-orange" />}
                    </span>
                  ))
                )}
              </nav>

              <div className="w-14 shrink-0" />

              <div className="flex shrink-0 items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600">
                  <Search className="h-[18px] w-[18px]" />
                </span>
                <span className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-600">Log in</span>
                <span className="rounded-full bg-ieee-orange px-4 py-2 text-sm font-semibold text-white">Sign up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
