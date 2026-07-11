import AdminResourcePage from '@/components/admin/AdminResourcePage';
import type { AdminTableColumn } from '@/components/admin/AdminTable';
import { AdminField, AdminInput, AdminTextarea, AdminSelect } from '@/components/admin/AdminField';
import { destinations as seedDestinations } from '@/data/destinations';
import { destinationTypes } from '@/data/routes';
import { makeId } from '@/utils/storage';
import type { Destination } from '@/types';

const columns: AdminTableColumn<Destination>[] = [
  { key: 'name', header: 'Destination', sortValue: (d) => d.name, render: (d) => <span className="font-medium text-slate-900">{d.name}</span> },
  {
    key: 'type',
    header: 'Type',
    sortValue: (d) => d.typeId,
    render: (d) => (
      <span className="rounded-full bg-ieee-orange/10 px-2.5 py-0.5 text-xs font-semibold text-ieee-orange">
        {destinationTypes.find((t) => t.id === d.typeId)?.label ?? d.typeId}
      </span>
    ),
  },
  { key: 'floor', header: 'Floor', sortValue: (d) => d.floor, render: (d) => d.floor },
  { key: 'description', header: 'Description', render: (d) => <span className="line-clamp-1 max-w-xs text-slate-500">{d.description}</span> },
];

export default function AdminNavigationPage() {
  return (
    <AdminResourcePage<Destination>
      title="Navigation & Destinations"
      subtitle="Rooms and labs mapped for the CS Block Navigation tool"
      addLabel="Add Destination"
      collectionKey="destinations"
      seed={seedDestinations}
      rowKey={(d) => d.id}
      columns={columns}
      searchable={(d) => `${d.name} ${d.floor} ${d.description}`}
      validate={(d) => !!d.name.trim()}
      emptyItem={() => ({ id: makeId('dest'), name: '', typeId: destinationTypes[0].id, floor: 'Ground Floor', description: '' })}
      renderForm={(draft, setDraft) => (
        <div className="flex flex-col gap-4">
          <AdminField label="Destination name" required>
            <AdminInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Lab 3" />
          </AdminField>
          <AdminField label="Type">
            <AdminSelect value={draft.typeId} onChange={(e) => setDraft({ ...draft, typeId: e.target.value })}>
              {destinationTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </AdminSelect>
          </AdminField>
          <AdminField label="Floor">
            <AdminInput value={draft.floor} onChange={(e) => setDraft({ ...draft, floor: e.target.value })} />
          </AdminField>
          <AdminField label="Description">
            <AdminTextarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </AdminField>
        </div>
      )}
    />
  );
}
