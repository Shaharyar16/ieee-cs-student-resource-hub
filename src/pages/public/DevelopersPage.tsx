import { motion } from 'framer-motion';
import { developers } from '@/data/developers';
import DeveloperCard from '@/components/cards/DeveloperCard';

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Meet the Developers</h1>
      <p className="mt-2 max-w-2xl text-slate-600">
        This resource hub is designed and built by student volunteers from the IEEE CS Student Branch
        Chapter. Here's the team behind it.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {developers.map((dev, idx) => (
          <motion.div
            key={dev.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <DeveloperCard developer={dev} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
