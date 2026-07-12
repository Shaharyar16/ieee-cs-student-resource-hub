import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarClock, Download, Info, FileX2 } from 'lucide-react';
import { PROGRAMS, type DateSheet, type Program } from '@/types';
import { dateSheets as seedDateSheets, currentTerm } from '@/data/dateSheets';
import { useCollection } from '@/hooks/useCollection';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';

const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const isImg = (url: string) => url.startsWith('data:image') || /\.(png|jpe?g|webp|gif)$/i.test(url) || url.includes('unsplash');
const isPdf = (url: string) => url.startsWith('data:application/pdf') || /\.pdf$/i.test(url);

export default function DateSheetsPage() {
  const { items: sheets } = useCollection<DateSheet>('dateSheets', seedDateSheets);
  const [program, setProgram] = useState<Program>('Computer Science');
  const [semester, setSemester] = useState(1);

  const { shown, isFallback } = useMemo(() => {
    const scoped = sheets.filter((s) => s.program === program && s.semester === semester);
    const current = scoped.find((s) => s.term === currentTerm.term && s.year === currentTerm.year);
    const latest = [...scoped].sort((a, b) => new Date(b.uploadedDate).getTime() - new Date(a.uploadedDate).getTime())[0];
    const resolved = current ?? latest ?? null;
    return { shown: resolved, isFallback: !!resolved && !current };
  }, [sheets, program, semester]);

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Exams"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Date Sheets' }]}
        title="Exam Date Sheets"
        subtitle={`Pick your program and semester to see the ${currentTerm.term} ${currentTerm.year} exam schedule. If it isn't up yet, we'll show the most recent one.`}
        meta={[
          { value: `${PROGRAMS.length}`, label: 'Programs' },
          { value: `${sheets.length}`, label: 'Sheets Uploaded' },
        ]}
      />

      <PageSection tone="cream" top width="narrow">
        {/* program selector */}
        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">Program</p>
          <div className="flex flex-wrap gap-2">
            {PROGRAMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProgram(p)}
                data-cursor="link"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  program === p
                    ? 'bg-ieee-ink text-white shadow-sm'
                    : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/50 hover:text-ieee-orange'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* semester selector */}
        <div className="mt-6">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-slate-400">Semester</p>
          <div className="flex flex-wrap gap-2">
            {semesters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSemester(s)}
                data-cursor="link"
                className={`h-11 w-11 rounded-full text-sm font-semibold transition ${
                  semester === s
                    ? 'bg-ieee-orange text-white shadow-[0_6px_20px_rgba(255,108,12,0.3)]'
                    : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/50 hover:text-ieee-orange'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${program}-${semester}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {shown ? (
              <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
                {isFallback && (
                  <div className="flex items-start gap-2 border-b border-amber-200 bg-amber-50 px-5 py-3 text-sm text-amber-800">
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      The <span className="font-semibold">{currentTerm.term} {currentTerm.year}</span> date sheet
                      for {program}, Semester {semester} isn't up yet — showing the most recent one ({shown.term}{' '}
                      {shown.year}).
                    </span>
                  </div>
                )}
                <div className="bg-slate-50">
                  {isPdf(shown.fileUrl) ? (
                    <iframe title={shown.title} src={shown.fileUrl} className="h-[28rem] w-full" />
                  ) : isImg(shown.fileUrl) ? (
                    <img src={shown.fileUrl} alt={shown.title} className="max-h-[28rem] w-full object-contain" />
                  ) : (
                    <div className="flex h-64 items-center justify-center text-sm text-slate-400">Preview unavailable</div>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                      <CalendarClock className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-slate-900">{shown.title}</p>
                      <p className="text-xs text-slate-500">
                        {shown.program} · Uploaded {shown.uploadedDate}
                      </p>
                    </div>
                  </div>
                  <a
                    href={shown.fileUrl}
                    download={shown.title}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="flex items-center gap-2 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,108,12,0.28)] transition hover:bg-ieee-orange-dark"
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-3xl border border-dashed border-black/15 bg-white px-6 py-16 text-center">
                <FileX2 className="h-10 w-10 text-slate-300" />
                <h3 className="mt-3 font-display text-lg font-bold text-slate-700">No date sheet uploaded</h3>
                <p className="mt-1 text-sm text-slate-500">
                  The {program}, Semester {semester} date sheet hasn't been added yet. Check back closer to exams.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </PageSection>
    </div>
  );
}
