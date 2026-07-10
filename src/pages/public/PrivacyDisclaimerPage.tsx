import { motion } from 'framer-motion';
import { Users2, BadgeCheck, FlagTriangleRight, ShieldOff, Database } from 'lucide-react';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';

const sections = [
  {
    icon: Users2,
    title: 'Student-Contributed Data',
    body: 'Most content on this site — past papers, course details, project entries, and navigation routes — is contributed by students on a voluntary basis. While we make a reasonable effort to review submissions, we cannot guarantee complete accuracy at all times.',
  },
  {
    icon: BadgeCheck,
    title: 'Verification Labels',
    body: 'Content is marked as Verified, Pending Review, or Unverified based on moderator review. Always double-check unverified or pending content against official sources where possible.',
  },
  {
    icon: FlagTriangleRight,
    title: 'Reporting Wrong Data',
    body: 'If you find incorrect information anywhere on the hub — a wrong past paper, outdated course detail, or an inaccurate navigation route — please use the relevant report or correction form so we can fix it quickly.',
  },
  {
    icon: ShieldOff,
    title: 'No Teacher Ratings',
    body: 'We intentionally do not publish teacher ratings, reviews, or opinions of any kind. Teacher profiles only contain factual, publicly appropriate contact and course-assignment information.',
  },
  {
    icon: Database,
    title: 'Form Data Handling',
    body: 'Data submitted through our forms (contributions, registrations, feedback, etc.) is used solely for the purpose of operating and improving this resource hub, and reviewed by student moderators. In this prototype, form submissions are stored locally in your browser only.',
  },
];

export default function PrivacyDisclaimerPage() {
  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="The Fine Print"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Privacy & Disclaimer' }]}
        title="Privacy & Disclaimer"
        subtitle="Please read this before contributing to or relying on hub content. We keep it short and honest."
      />

      <PageSection tone="cream" top width="narrow">
        <div className="flex flex-col gap-5">
          {sections.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.section
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="flex gap-4 rounded-3xl border border-black/5 bg-white p-6 shadow-sm sm:p-7"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold text-slate-900">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
                </div>
              </motion.section>
            );
          })}
        </div>
      </PageSection>
    </div>
  );
}
