import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminTable, { type AdminTableColumn } from '@/components/admin/AdminTable';
import { destinations } from '@/data/destinations';
import { destinationTypes } from '@/data/routes';
import type { Destination } from '@/types';

export default function AdminNavigationPage() {
  const columns: AdminTableColumn<Destination>[] = [
    { key: 'name', header: 'Destination', render: (d) => <span className="font-medium text-slate-900">{d.name}</span> },
    {
      key: 'type',
      header: 'Type',
      render: (d) => destinationTypes.find((t) => t.id === d.typeId)?.label ?? d.typeId,
    },
    { key: 'floor', header: 'Floor', render: (d) => d.floor },
    { key: 'description', header: 'Description', render: (d) => d.description },
  ];

  return (
    <div>
      <AdminTopbar title="Navigation & Destinations" />
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex justify-end">
          <button className="rounded-lg bg-ieee-orange px-4 py-2 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
            + Add Destination
          </button>
        </div>
        <AdminTable columns={columns} rows={destinations} rowKey={(d) => d.id} />
      </div>
    </div>
  );
}
