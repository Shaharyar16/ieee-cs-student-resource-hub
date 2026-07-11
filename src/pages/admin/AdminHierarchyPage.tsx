import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import AdminTopbar from '@/components/admin/AdminTopbar';
import AdminEditDrawer from '@/components/admin/AdminEditDrawer';
import { AdminField, AdminInput, AdminImageField } from '@/components/admin/AdminField';
import ConfirmModal from '@/components/ui/ConfirmModal';
import Avatar from '@/components/ui/Avatar';
import { hierarchyTerms as seedTerms } from '@/data/hierarchy';
import { useStore } from '@/hooks/useCollection';
import { makeId } from '@/utils/storage';
import type { HierarchyMember, HierarchyTerm } from '@/types';

export default function AdminHierarchyPage() {
  const [terms, setTerms] = useStore<HierarchyTerm>('hierarchyTerms', seedTerms);
  const [selectedTerm, setSelectedTerm] = useState(seedTerms[0].term);
  const [draft, setDraft] = useState<HierarchyMember | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleting, setDeleting] = useState<HierarchyMember | null>(null);

  const selected = terms.find((t) => t.term === selectedTerm) ?? terms[0];

  const openNew = () => {
    setDraft({ id: makeId('h'), name: '', role: '', photo: '' });
    setIsNew(true);
  };
  const openEdit = (m: HierarchyMember) => {
    setDraft(m);
    setIsNew(false);
  };

  const save = () => {
    if (!draft || !draft.name.trim()) return;
    setTerms(
      terms.map((t) => {
        if (t.term !== selectedTerm) return t;
        const exists = t.members.some((m) => m.id === draft.id);
        return { ...t, members: exists ? t.members.map((m) => (m.id === draft.id ? draft : m)) : [...t.members, draft] };
      })
    );
    setDraft(null);
  };

  const remove = () => {
    if (!deleting) return;
    setTerms(terms.map((t) => (t.term === selectedTerm ? { ...t, members: t.members.filter((m) => m.id !== deleting.id) } : t)));
    setDeleting(null);
  };

  return (
    <div>
      <AdminTopbar
        title="Hierarchy Management"
        subtitle="Executive council shown on the About page"
        action={
          <button
            onClick={openNew}
            className="flex items-center gap-1.5 rounded-xl bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ieee-orange-dark"
          >
            <Plus className="h-4 w-4" /> Add Member
          </button>
        }
      />
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap gap-2">
          {terms.map((t) => (
            <button
              key={t.term}
              onClick={() => setSelectedTerm(t.term)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                selectedTerm === t.term ? 'bg-ieee-orange text-white shadow-sm' : 'border border-black/10 bg-white text-slate-600 hover:border-ieee-orange/40'
              }`}
            >
              {t.term}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {selected.members.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-white p-4 text-center shadow-sm transition hover:shadow-md"
            >
              <Avatar name={m.name} src={m.photo} size="lg" />
              <p className="text-sm font-semibold text-slate-900">{m.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ieee-orange">{m.role}</p>
              <div className="mt-1 flex gap-3 text-xs">
                <button onClick={() => openEdit(m)} className="flex items-center gap-1 font-semibold text-slate-500 hover:text-ieee-orange">
                  <Pencil className="h-3 w-3" /> Edit
                </button>
                <button onClick={() => setDeleting(m)} className="flex items-center gap-1 font-semibold text-slate-500 hover:text-rose-600">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AdminEditDrawer
        open={!!draft}
        title={isNew ? 'Add Member' : 'Edit Member'}
        subtitle={selectedTerm}
        onClose={() => setDraft(null)}
        footer={
          <button onClick={save} className="w-full rounded-xl bg-ieee-orange px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ieee-orange-dark">
            Save
          </button>
        }
      >
        {draft && (
          <div className="flex flex-col gap-4">
            <AdminField label="Photo">
              <AdminImageField value={draft.photo} onChange={(photo) => setDraft({ ...draft, photo })} />
            </AdminField>
            <AdminField label="Name" required>
              <AdminInput value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </AdminField>
            <AdminField label="Role" required hint="e.g. Chairperson, Technical Lead">
              <AdminInput value={draft.role} onChange={(e) => setDraft({ ...draft, role: e.target.value })} />
            </AdminField>
          </div>
        )}
      </AdminEditDrawer>

      <ConfirmModal
        open={!!deleting}
        title={`Remove ${deleting?.name}?`}
        description="They will be removed from this term's council."
        danger
        confirmLabel="Remove"
        onCancel={() => setDeleting(null)}
        onConfirm={remove}
      />
    </div>
  );
}
