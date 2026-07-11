import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle, Loader2 } from 'lucide-react';
import type { ProjectPost } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { projectsService, commentCount } from '@/services/projectsService';
import Avatar from '@/components/ui/Avatar';
import { timeAgo } from '@/utils/time';

interface Props {
  project: ProjectPost;
  onChange: (updated: ProjectPost) => void;
}

export default function CommentSection({ project, onChange }: Props) {
  const { user, promptAuth } = useAuth();
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !body.trim()) return;
    setBusy(true);
    try {
      const updated = await projectsService.addComment(project.id, user, body);
      onChange(updated);
      setBody('');
    } finally {
      setBusy(false);
    }
  }

  const comments = [...project.comments].reverse(); // newest first

  return (
    <div id="comments" className="scroll-mt-28">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold text-slate-900">
        <MessageCircle className="h-5 w-5 text-ieee-orange" />
        Comments
        <span className="font-mono text-sm font-medium text-slate-400">{commentCount(project)}</span>
      </h2>

      {/* composer */}
      {user ? (
        <form onSubmit={submit} className="mt-5 flex items-start gap-3">
          <Avatar name={user.name} src={user.avatar} size="md" />
          <div className="flex-1">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={2}
              placeholder="Share your thoughts…"
              className="w-full resize-y rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-ieee-orange focus:ring-2 focus:ring-ieee-orange/20"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                disabled={busy || !body.trim()}
                data-cursor="link"
                className="flex items-center gap-2 rounded-xl bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(255,108,12,0.28)] transition hover:bg-ieee-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Comment
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => promptAuth('Log in to join the conversation.')}
          data-cursor="link"
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-dashed border-black/15 bg-white px-4 py-4 text-left text-sm text-slate-500 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
        >
          <MessageCircle className="h-5 w-5" />
          Log in to join the conversation…
        </button>
      )}

      {/* list */}
      <div className="mt-8 flex flex-col gap-5">
        <AnimatePresence initial={false}>
          {comments.map((c) => (
            <motion.div
              key={c.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <Avatar name={c.authorName} src={c.authorAvatar} size="sm" />
              <div className="flex-1 rounded-2xl rounded-tl-sm bg-cream px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{c.authorName}</span>
                  <span className="font-mono text-[11px] text-slate-400">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <p className="rounded-2xl border border-dashed border-black/10 bg-white px-4 py-8 text-center text-sm text-slate-400">
            No comments yet — be the first to say something.
          </p>
        )}
      </div>
    </div>
  );
}
