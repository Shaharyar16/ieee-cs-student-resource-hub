import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Icon, { type IconName } from '@/components/ui/Icon';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';

const options: { title: string; icon: IconName; to: string; description: string }[] = [
  { title: 'Contribute Past Paper', icon: 'file', to: '/past-papers/contribute', description: 'Upload a past exam paper for your juniors.' },
  { title: 'Suggest Course Resource', icon: 'book', to: '/courses/suggest-correction', description: 'Correct or add missing course information.' },
  { title: 'Submit Project', icon: 'layers', to: '/projects-expo/submit', description: 'Showcase your semester project.' },
  { title: 'Report Navigation Issue', icon: 'compass', to: '/navigation/report', description: 'Flag an incorrect indoor route.' },
  { title: 'Submit Event Photos', icon: 'image', to: '/faq-contact', description: 'Share photos from a recent event.' },
  { title: 'General Feedback', icon: 'message', to: '/faq-contact', description: 'Tell us what we can improve.' },
  { title: 'Sponsorship / Advertisement', icon: 'users', to: '/faq-contact', description: 'Partner with IEEE CS for your brand or event.' },
];

export default function ContributePage() {
  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Get Involved"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contribute' }]}
        title="Contribute to the Hub"
        subtitle="This hub is built by students, for students. Here's every way you can help make it better — pick one and jump in."
        meta={[{ value: `${options.length}`, label: 'Ways to Help' }]}
      />

      <PageSection tone="cream" top>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((opt, idx) => (
            <motion.div
              key={opt.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (idx % 3) * 0.05 }}
            >
              <Link
                to={opt.to}
                data-cursor="link"
                className="group flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ieee-orange/30 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                    <Icon name={opt.icon} className="h-6 w-6" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ieee-orange" />
                </div>
                <h3 className="mt-1 font-display text-lg font-semibold text-slate-900">{opt.title}</h3>
                <p className="text-sm text-slate-600">{opt.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
