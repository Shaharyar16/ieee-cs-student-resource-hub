import { motion } from 'framer-motion';
import { developers } from '@/data/developers';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import DeveloperCard from '@/components/cards/DeveloperCard';

export default function DevelopersPage() {
  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="The Team"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Developers' }]}
        title="Meet the Developers"
        subtitle="This resource hub is designed and built by student volunteers from the IEEE CS Student Branch Chapter. Here's the team behind it."
        meta={[{ value: `${developers.length}`, label: 'Contributors' }]}
      />

      <PageSection tone="cream" top>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((dev, idx) => (
            <motion.div
              key={dev.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: (idx % 3) * 0.05 }}
            >
              <DeveloperCard developer={dev} />
            </motion.div>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
