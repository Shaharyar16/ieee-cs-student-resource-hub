import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Repeat2, Share2, Check } from 'lucide-react';
import type { ProjectPost } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import {
  projectsService,
  likeCount,
  repostCount,
  commentCount,
  hasLiked,
  hasReposted,
} from '@/services/projectsService';
import Avatar from '@/components/ui/Avatar';
import LikeButton from '@/components/projects/LikeButton';
import { timeAgo } from '@/utils/time';

interface Props {
  project: ProjectPost;
  onChange: (updated: ProjectPost) => void;
}

export default function ProjectPostCard({ project, onChange }: Props) {
  const { user, ensureAuth } = useAuth();
  const [copied, setCopied] = useState(false);

  const runLike = async () => {
    const u = authService.getCurrentUser();
    if (!u) return;
    onChange(await projectsService.toggleLike(project.id, u.id));
  };
  const runRepost = async () => {
    const u = authService.getCurrentUser();
    if (!u) return;
    onChange(await projectsService.toggleRepost(project.id, u.id));
  };
  const runShare = async () => {
    const url = `${window.location.origin}/projects-expo/${project.id}`;
    try {
      if (navigator.share) await navigator.share({ title: project.title, url });
      else await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* user dismissed share sheet */
    }
  };

  const gate = (action: () => void, reason: string) => () => {
    if (ensureAuth(action, reason)) action();
  };

  const reposted = hasReposted(project, user?.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(10,10,12,0.1)]"
    >
      {/* header */}
      <div className="flex items-center gap-3 px-5 pt-5">
        <Avatar name={project.authorName} src={project.authorAvatar} size="md" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-900">{project.authorName}</p>
          <p className="truncate text-xs text-slate-500">
            {project.creators.length > 1 ? `${project.creators.length} creators` : 'shared a project'} ·{' '}
            {timeAgo(project.createdAt)}
          </p>
        </div>
        {project.category && (
          <span className="ml-auto shrink-0 rounded-full bg-ieee-orange/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-ieee-orange">
            {project.category}
          </span>
        )}
      </div>

      {/* body */}
      <Link to={`/projects-expo/${project.id}`} data-cursor="link" className="group block">
        <div className="px-5 pt-4">
          <h3 className="font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-ieee-orange">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">{project.tagline}</p>
        </div>
        {project.screenshots[0] && (
          <div className="mt-4 overflow-hidden">
            <img
              src={project.screenshots[0]}
              alt={project.title}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-64"
            />
          </div>
        )}
      </Link>

      {/* tech */}
      {project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-5 pt-4">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-cream px-2.5 py-1 font-mono text-[11px] text-slate-600">
              {t}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded-full bg-cream px-2.5 py-1 font-mono text-[11px] text-slate-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      )}

      {/* counts */}
      <div className="flex items-center gap-3 px-5 pt-3 text-xs text-slate-400">
        <span>{likeCount(project)} likes</span>
        <span>·</span>
        <span>{commentCount(project)} comments</span>
        <span>·</span>
        <span>{repostCount(project)} reposts</span>
      </div>

      {/* actions */}
      <div className="mt-2 flex items-center justify-between border-t border-black/5 px-3 py-1.5">
        <LikeButton
          active={hasLiked(project, user?.id)}
          count={likeCount(project)}
          onToggle={gate(runLike, 'Log in to like projects.')}
        />
        <Link
          to={`/projects-expo/${project.id}#comments`}
          data-cursor="link"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-ieee-orange"
        >
          <MessageCircle className="h-[18px] w-[18px]" />
          <span className="tabular-nums">{commentCount(project)}</span>
        </Link>
        <button
          type="button"
          onClick={gate(runRepost, 'Log in to repost projects.')}
          data-cursor="link"
          className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
            reposted ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-600'
          }`}
        >
          <Repeat2 className="h-[18px] w-[18px]" />
          <span className="tabular-nums">{repostCount(project)}</span>
        </button>
        <button
          type="button"
          onClick={gate(runShare, 'Log in to share projects.')}
          data-cursor="link"
          className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-ieee-orange"
        >
          {copied ? <Check className="h-[18px] w-[18px] text-emerald-600" /> : <Share2 className="h-[18px] w-[18px]" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>
    </motion.article>
  );
}
