import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon, { type IconName } from '@/components/ui/Icon';

const options: { title: string; icon: IconName; to: string; description: string }[] = [
  { title: 'Contribute Past Paper', icon: 'file', to: '/past-papers/contribute', description: 'Upload a past exam paper for your juniors.' },
  { title: 'Suggest Course Resource', icon: 'book', to: '/courses/suggest-correction', description: 'Correct or add missing course information.' },
  { title: 'Submit Project', icon: 'layers', to: '/projects-expo/submit', description: 'Showcase your semester project.' },
  { title: 'Report Navigation Issue', icon: 'compass', to: '/navigation/report', description: 'Flag an incorrect indoor route.' },
  { title: 'Submit Event Photos', icon: 'image', to: '/faq-contact', description: 'Share photos from a recent event.' },
  { title: 'General Feedback', icon: 'message', to: '/faq-contact', description: 'Tell us what we can improve.' },
  { title: 'Sponsorship / Advertisement Request', icon: 'users', to: '/faq-contact', description: 'Partner with IEEE CS for your brand or event.' },
];

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Contribute</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        This hub is built by students, for students. Here's how you can help make it better.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((opt, idx) => (
          <motion.div
            key={opt.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <Link
              to={opt.to}
              className="flex h-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-ieee-orange hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ieee-orange/10 text-ieee-orange">
                <Icon name={opt.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-semibold text-slate-900">{opt.title}</h3>
              <p className="text-sm text-slate-500">{opt.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
