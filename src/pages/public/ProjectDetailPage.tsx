import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, MessageCircle, Repeat2, Share2, Check, Users2, X } from 'lucide-react';
import type { ProjectPost } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import {
  projectsService,
  likeCount,
  commentCount,
  repostCount,
  hasReposted,
  hasLiked,
} from '@/services/projectsService';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import EmptyState from '@/components/ui/EmptyState';
import Avatar from '@/components/ui/Avatar';
import Magnetic from '@/components/effects/Magnetic';
import LikeButton from '@/components/projects/LikeButton';
import CommentSection from '@/components/projects/CommentSection';
import { timeAgo } from '@/utils/time';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { user, ensureAuth } = useAuth();
  const [project, setProject] = useState<ProjectPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    projectsService.get(id ?? '').then((p) => {
      if (alive) {
        setProject(p);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="relative">
        <PageHero compact eyebrow="Project" title="Loading…" breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects-expo' }, { label: '…' }]} />
        <PageSection tone="cream" top>
          <div className="h-96 animate-pulse rounded-3xl border border-black/5 bg-white" />
        </PageSection>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Projects"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects-expo' }, { label: 'Not found' }]}
          title="Project not found"
          subtitle="This project may have been removed or the link is incorrect."
        />
        <PageSection tone="cream" top>
          <EmptyState
            title="Nothing here"
            action={
              <Link to="/projects-expo" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Projects
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  const runLike = async () => {
    const u = authService.getCurrentUser();
    if (u) setProject(await projectsService.toggleLike(project.id, u.id));
  };
  const runRepost = async () => {
    const u = authService.getCurrentUser();
    if (u) setProject(await projectsService.toggleRepost(project.id, u.id));
  };
  const runShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: project.title, url });
      else await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* dismissed */
    }
  };
  const gate = (action: () => void, reason: string) => () => {
    if (ensureAuth(action, reason)) action();
  };

  const reposted = hasReposted(project, user?.id);

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow={project.category ?? 'Project'}
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Projects', to: '/projects-expo' }, { label: project.title }]}
        title={project.title}
        subtitle={project.tagline}
        meta={[
          { value: `${likeCount(project)}`, label: 'Likes' },
          { value: `${commentCount(project)}`, label: 'Comments' },
          { value: `${repostCount(project)}`, label: 'Reposts' },
        ]}
      />

      <PageSection tone="cream" top width="wide">
        <div className="mx-auto max-w-3xl">
          {/* author + actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <Avatar name={project.authorName} src={project.authorAvatar} size="lg" />
              <div>
                <p className="font-semibold text-slate-900">{project.authorName}</p>
                <p className="text-xs text-slate-500">Posted {timeAgo(project.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <LikeButton
                active={hasLiked(project, user?.id)}
                count={likeCount(project)}
                onToggle={gate(runLike, 'Log in to like projects.')}
              />
              <a
                href="#comments"
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition-colors hover:text-ieee-orange"
              >
                <MessageCircle className="h-[18px] w-[18px]" />
                <span className="tabular-nums">{commentCount(project)}</span>
              </a>
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
              </button>
            </div>
          </div>

          {/* gallery */}
          {project.screenshots.length > 0 && (
            <div className={`mt-6 grid gap-3 ${project.screenshots.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {project.screenshots.map((s, i) => (
                <motion.button
                  key={s.slice(-16) + i}
                  type="button"
                  onClick={() => setLightbox(s)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`group overflow-hidden rounded-2xl border border-black/5 shadow-sm ${
                    project.screenshots.length === 3 && i === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <img
                    src={s}
                    alt={`${project.title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="h-full max-h-80 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </motion.button>
              ))}
            </div>
          )}

          {/* description */}
          <div className="mt-6 rounded-3xl border border-black/5 bg-white p-7 shadow-sm sm:p-8">
            <p className="whitespace-pre-wrap leading-relaxed text-slate-700">{project.description}</p>

            {project.techStack.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-ieee-orange/20 bg-ieee-orange/10 px-3 py-1.5 font-mono text-xs text-ieee-orange"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center gap-2 border-t border-black/5 pt-5 text-sm text-slate-600">
              <Users2 className="h-4 w-4 text-ieee-orange" />
              <span className="font-medium text-slate-800">Built by</span> {project.creators.join(', ')}
            </div>

            {(project.githubUrl || project.demoUrl) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.demoUrl && (
                  <Magnetic>
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="flex items-center gap-2 rounded-xl bg-ieee-orange px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(255,108,12,0.3)] transition hover:bg-ieee-orange-dark"
                    >
                      <ExternalLink className="h-4 w-4" /> Live Demo
                    </a>
                  </Magnetic>
                )}
                {project.githubUrl && (
                  <Magnetic>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="link"
                      className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-ieee-orange/40 hover:text-ieee-orange"
                    >
                      <Code2 className="h-4 w-4" /> View Code
                    </a>
                  </Magnetic>
                )}
              </div>
            )}
          </div>

          {/* comments */}
          <div className="mt-10">
            <CommentSection project={project} onChange={setProject} />
          </div>
        </div>
      </PageSection>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ieee-ink/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightbox}
              alt="Screenshot"
              className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
