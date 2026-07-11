import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, ClipboardPlus } from 'lucide-react';
import AdminResourcePage, { type ResourceApi } from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminSelect, AdminImageField } from '@/components/admin/AdminField';
import { events as seedEvents } from '@/data/events';
import { formsService } from '@/services/formsService';
import { makeId } from '@/utils/storage';
import type { EventItem, FormFieldType } from '@/types';

const regField = (label: string, type: FormFieldType, required = true, options?: string[]) => ({
  id: makeId('ff'),
  type,
  label,
  required,
  options: options?.map((o) => ({ id: makeId('opt'), label: o })),
});

const cats: EventItem['category'][] = ['workshop', 'competition', 'seminar', 'hackathon'];
const timings: EventItem['timing'][] = ['upcoming', 'previous', 'featured'];

const columns: AdminTableColumn<EventItem>[] = [
  { key: 'title', header: 'Title', sortValue: (e) => e.title, render: (e) => <span className="font-medium text-slate-900">{e.title}</span> },
  { key: 'category', header: 'Category', sortValue: (e) => e.category, render: (e) => <span className="capitalize">{e.category}</span> },
  { key: 'date', header: 'Date', sortValue: (e) => e.date, render: (e) => e.date },
  {
    key: 'timing',
    header: 'Timing',
    sortValue: (e) => e.timing,
    render: (e) => (
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${e.timing === 'upcoming' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
        {e.timing}
      </span>
    ),
  },
];

export default function AdminEventsPage() {
  const navigate = useNavigate();

  const createRegForm = async (event: EventItem, api: ResourceApi<EventItem>) => {
    const form = await formsService.create({
      title: `Register — ${event.title}`,
      description: `Registration form for ${event.title}.`,
      pages: [
        {
          id: makeId('fp'),
          fields: [
            regField('Full Name', 'short-text'),
            regField('Email', 'email'),
            regField('Roll Number', 'short-text'),
            regField('Batch', 'dropdown', true, ['2022', '2023', '2024', '2025', '2026']),
          ],
        },
      ],
    });
    api.update({ registrationFormId: form.id });
    navigate(`/portal/forms/${form.id}/edit`);
  };

  return (
    <AdminResourcePage<EventItem>
      title="Events"
      subtitle="Create events, build custom registration forms, and view responses"
      addLabel="Add Event"
      collectionKey="events"
      seed={seedEvents}
      rowKey={(e) => e.id}
      columns={columns}
      searchable={(e) => `${e.title} ${e.category} ${e.venue}`}
      validate={(e) => !!e.title.trim()}
      extraActions={(event, api) =>
        event.registrationFormId ? (
          <Link
            to={`/portal/forms/${event.registrationFormId}/responses`}
            className="flex items-center gap-1 rounded-lg border border-black/5 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
          >
            <BarChart3 className="h-3.5 w-3.5" /> Registrations
          </Link>
        ) : (
          <button
            onClick={() => createRegForm(event, api)}
            className="flex items-center gap-1 rounded-lg border border-black/5 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
          >
            <ClipboardPlus className="h-3.5 w-3.5" /> Reg. form
          </button>
        )
      }
      emptyItem={() => ({
        id: makeId('evt'),
        title: '',
        description: '',
        longDescription: '',
        date: new Date().toISOString().slice(0, 10),
        time: '',
        venue: '',
        category: 'workshop',
        timing: 'upcoming',
        registrationOpen: true,
        capacity: 100,
        registered: 0,
        image: '',
        organizers: [],
      })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Cover image">
            <AdminImageField value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
          </AdminField>
          <AdminField label="Title" required>
            <AdminInput value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </AdminField>
          <AdminField label="Short description">
            <AdminInput value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </AdminField>
          <AdminField label="Full description">
            <AdminTextarea value={draft.longDescription} onChange={(e) => setDraft({ ...draft, longDescription: e.target.value })} />
          </AdminField>
          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Category">
              <AdminSelect value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as EventItem['category'] })}>
                {cats.map((c) => (
                  <option key={c} value={c} className="capitalize">
                    {c}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
            <AdminField label="Timing">
              <AdminSelect value={draft.timing} onChange={(e) => setDraft({ ...draft, timing: e.target.value as EventItem['timing'] })}>
                {timings.map((t) => (
                  <option key={t} value={t} className="capitalize">
                    {t}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <AdminField label="Date">
              <AdminInput type="date" value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
            </AdminField>
            <AdminField label="Time">
              <AdminInput value={draft.time} onChange={(e) => setDraft({ ...draft, time: e.target.value })} placeholder="10:00 AM - 4:00 PM" />
            </AdminField>
          </div>
          <AdminField label="Venue">
            <AdminInput value={draft.venue} onChange={(e) => setDraft({ ...draft, venue: e.target.value })} />
          </AdminField>
          <AdminField label="Organizers" hint="Comma-separated">
            <AdminInput
              value={draft.organizers.join(', ')}
              onChange={(e) => setDraft({ ...draft, organizers: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
            />
          </AdminField>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={draft.registrationOpen}
              onChange={(e) => setDraft({ ...draft, registrationOpen: e.target.checked })}
              className="accent-ieee-orange"
            />
            Registration open
          </label>
        </div>
      )}
    />
  );
}
