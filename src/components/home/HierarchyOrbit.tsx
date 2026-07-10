import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { currentHierarchy } from '@/data/hierarchy';
import type { HierarchyMember } from '@/types';

const roleBlurb: Record<string, string> = {
  Chairperson: "Sets the chapter's direction and represents it to IEEE CS.",
  'Vice Chairperson': 'Supports leadership and steps in wherever needed.',
  'General Secretary': 'Keeps records, minutes, and chapter operations on track.',
  Treasurer: 'Manages chapter funds, sponsorships, and budgeting.',
  'Technical Lead': 'Leads workshops, hackathons, and technical content.',
  'Events Lead': 'Plans and runs chapter events end-to-end.',
};
const fallbackBlurb = 'Active contributor to the IEEE CS student chapter.';

// Placeholder seats to round the current FA26 roster out to a 13-person board —
// swap these for real members once the rest of the team is confirmed.
const placeholderMembers: HierarchyMember[] = [
  { id: 'ph-1', name: 'To Be Announced', role: 'PR & Outreach Lead', photo: 'https://i.pravatar.cc/200?img=51' },
  { id: 'ph-2', name: 'To Be Announced', role: 'Design Lead', photo: 'https://i.pravatar.cc/200?img=52' },
  { id: 'ph-3', name: 'To Be Announced', role: 'Content Lead', photo: 'https://i.pravatar.cc/200?img=53' },
  { id: 'ph-4', name: 'To Be Announced', role: 'Sponsorship Lead', photo: 'https://i.pravatar.cc/200?img=54' },
  { id: 'ph-5', name: 'To Be Announced', role: 'Web & Systems Lead', photo: 'https://i.pravatar.cc/200?img=55' },
  { id: 'ph-6', name: 'To Be Announced', role: 'Community Lead', photo: 'https://i.pravatar.cc/200?img=56' },
  { id: 'ph-7', name: 'To Be Announced', role: 'Logistics Lead', photo: 'https://i.pravatar.cc/200?img=57' },
];

const members = [...currentHierarchy.members, ...placeholderMembers].slice(0, 13);

const groupVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'backOut' } },
};

export default function HierarchyOrbit() {
  return (
    <section id="hierarchy" className="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-ieee-orange">
            The People
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold text-cream sm:text-4xl">
            Chapter Hierarchy
          </h2>
          <p className="mt-3 text-white/60">
            The FA26 team steering the chapter, joined by a few open seats.
          </p>
          <Link
            to="/about/hierarchy"
            data-cursor="link"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ieee-orange hover:underline"
          >
            View full hierarchy <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={groupVariants}
          className="mt-14 grid grid-cols-3 gap-x-4 gap-y-10 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7"
        >
          {members.map((member, i) => {
            const blurb = roleBlurb[member.role] ?? fallbackBlurb;
            return (
              <motion.div
                key={member.id}
                variants={cardVariants}
                data-cursor="link"
                className="group relative flex flex-col items-center gap-2 text-center"
              >
                <div
                  className="animate-float-y"
                  style={{ animationDelay: `${(i % 6) * 0.4}s`, animationDuration: `${5 + (i % 4)}s` }}
                >
                  <div className="relative">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-16 w-16 rounded-full border-2 border-white/15 object-cover shadow-md transition-all duration-300 group-hover:scale-110 group-hover:border-ieee-orange/60 sm:h-20 sm:w-20"
                    />
                    <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_0_6px_rgba(255,108,12,0.12)] transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-cream sm:text-sm">{member.name}</p>
                  <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wide text-ieee-orange sm:text-[10px]">
                    {member.role}
                  </p>
                </div>

                <div className="glass-panel-dark pointer-events-none absolute -top-3 left-1/2 z-30 w-40 -translate-x-1/2 -translate-y-full rounded-xl border-white/10 p-2.5 text-center opacity-0 shadow-2xl transition-opacity duration-200 group-hover:opacity-100">
                  <p className="text-[11px] leading-snug text-white/80">{blurb}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
