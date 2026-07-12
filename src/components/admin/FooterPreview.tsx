import { useLayoutEffect, useRef, useState } from 'react';
import BrandLogo from '@/components/ui/BrandLogo';
import { footerColumns } from '@/data/footerLinks';
import type { FooterLinkItem } from '@/types';

/** Don't shrink below this — past here we let it scroll so text stays readable. */
const MIN_SCALE = 0.55;

/**
 * A faithful replica of the public footer's link area, laid out at real
 * proportions and uniformly scaled down to fit the admin panel width (same
 * approach as NavbarPreview). Shows only enabled links, grouped by column.
 */
export default function FooterPreview({ links }: { links: FooterLinkItem[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ scale: 1, w: 0, h: 0 });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const content = contentRef.current;
    if (!wrap || !content) return;
    const measure = () => {
      const natW = content.offsetWidth;
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
  const columns = footerColumns.map((title) => ({ title, links: links.filter((l) => l.column === title) }));

  return (
    <div>
      <p className="mb-1.5 flex flex-wrap items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-slate-400">
        Footer preview
        <span className="font-sans text-[10px] normal-case text-slate-300">· enabled links only</span>
      </p>
      <div ref={wrapRef} className="overflow-x-auto overflow-y-hidden rounded-2xl">
        <div className="mx-auto" style={{ width: w ? w * scale : undefined, height: h ? h * scale : undefined }}>
          <div
            ref={contentRef}
            style={{ width: 980, transform: `scale(${scale})`, transformOrigin: 'top left' }}
            className="overflow-hidden rounded-2xl bg-ieee-ink"
          >
            <div className="grid grid-cols-5 gap-8 px-8 pb-8 pt-9">
              <div className="col-span-2">
                <div className="flex items-center gap-2.5">
                  <BrandLogo className="h-9 w-9" />
                  <span className="font-display font-bold text-white">IEEE CS Hub</span>
                </div>
                <p className="mt-3 max-w-xs text-sm text-slate-400">
                  The central place for past papers, courses, events, navigation, and student project
                  showcases at COMSATS.
                </p>
                <div className="mt-4 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-8 w-8 rounded-full border border-white/10" />
                  ))}
                </div>
              </div>

              {columns.map((col) => (
                <div key={col.title}>
                  <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-white/80">
                    {col.title}
                  </h4>
                  {col.links.length === 0 ? (
                    <p className="text-sm italic text-slate-600">None</p>
                  ) : (
                    <ul className="flex flex-col gap-2.5 text-sm">
                      {col.links.map((link) => (
                        <li key={link.id} className="text-slate-400">
                          {link.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 px-8 py-4 text-center font-mono text-[11px] text-slate-500">
              © {new Date().getFullYear()} IEEE Computer Society Islamabad Branch Chapter.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
