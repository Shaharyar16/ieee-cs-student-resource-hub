import { useState } from 'react';
import AdminTopbar from '@/components/admin/AdminTopbar';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <AdminTopbar title="Settings" />
      <div className="mx-auto max-w-2xl p-4 sm:p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Society Information</h3>
          <div className="mt-4 flex flex-col gap-4 text-sm">
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Society Name</span>
              <input defaultValue="IEEE Computer Society Student Branch Chapter" className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Contact Email</span>
              <input defaultValue="ieeecs.studentbranch@example.edu" className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-slate-700">Instagram URL</span>
              <input defaultValue="https://instagram.com" className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-slate-900">Announcement Ticker</h3>
          <p className="mt-1 text-sm text-slate-500">Manage the scrolling ticker text shown on the homepage.</p>
          <textarea
            defaultValue={
              'IEEE CS Workshop registrations are now open.\nPast paper contribution drive is live.\nCS Block navigation beta is available.'
            }
            className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={() => setSaved(true)}
          className="mt-6 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-ieee-orange-dark"
        >
          Save Settings
        </button>
        {saved && <p className="mt-2 text-sm font-medium text-emerald-600">Settings saved (prototype only).</p>}
      </div>
    </div>
  );
}
