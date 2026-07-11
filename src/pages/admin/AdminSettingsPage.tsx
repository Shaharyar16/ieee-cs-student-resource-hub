import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Save } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import { AdminField, AdminInput, AdminTextarea } from '@/components/admin/AdminField';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div>
      <AdminTopbar title="Settings" subtitle="Society info and site-wide content" />
      <div className="mx-auto max-w-2xl p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
        >
          <h3 className="font-display text-base font-bold text-slate-900">Society Information</h3>
          <div className="mt-4 flex flex-col gap-4">
            <AdminField label="Society Name">
              <AdminInput defaultValue="IEEE Computer Society Student Branch Chapter" />
            </AdminField>
            <AdminField label="Contact Email">
              <AdminInput defaultValue="ieeecs.studentbranch@example.edu" />
            </AdminField>
            <AdminField label="Instagram URL">
              <AdminInput defaultValue="https://instagram.com" />
            </AdminField>
            <AdminField label="LinkedIn URL">
              <AdminInput defaultValue="https://linkedin.com" />
            </AdminField>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="mt-6 rounded-2xl border border-black/5 bg-white p-6 shadow-sm"
        >
          <h3 className="font-display text-base font-bold text-slate-900">Announcement Ticker</h3>
          <p className="mt-1 text-sm text-slate-500">One line per item — shown in the scrolling ticker on the homepage.</p>
          <AdminTextarea
            defaultValue={
              'IEEE CS Workshop registrations are now open.\nPast paper contribution drive is live.\nCS Block navigation beta is available.'
            }
            className="mt-3 min-h-28"
          />
        </motion.div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
          >
            <Save className="h-4 w-4" /> Save Settings
          </button>
          <AnimatePresence>
            {saved && (
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 text-sm font-medium text-emerald-600"
              >
                <Check className="h-4 w-4" /> Saved (prototype only)
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
