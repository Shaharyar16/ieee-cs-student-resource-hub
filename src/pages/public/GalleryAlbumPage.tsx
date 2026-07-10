import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { galleryAlbums } from '@/data/gallery';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import EmptyState from '@/components/ui/EmptyState';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function GalleryAlbumPage() {
  const { id } = useParams();
  const album = galleryAlbums.find((a) => a.id === id);

  if (!album) {
    return (
      <div className="relative">
        <PageHero
          compact
          eyebrow="Gallery"
          breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery', to: '/gallery' }, { label: 'Not found' }]}
          title="Album not found"
          subtitle="This album may have been removed or the link is incorrect."
        />
        <PageSection tone="cream" top>
          <EmptyState
            title="Nothing here"
            action={
              <Link to="/gallery" className="rounded-lg bg-ieee-orange px-5 py-2.5 text-sm font-semibold text-white hover:bg-ieee-orange-dark">
                Back to Gallery
              </Link>
            }
          />
        </PageSection>
      </div>
    );
  }

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Album"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery', to: '/gallery' }, { label: album.title }]}
        title={album.title}
        subtitle={album.description}
        meta={[
          { value: `${album.images.length}`, label: 'Photos' },
          { value: formatDate(album.date), label: 'Date' },
        ]}
      />

      <PageSection tone="cream" top>
        <Link
          to="/gallery"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-ieee-orange"
        >
          <ArrowLeft className="h-4 w-4" /> All albums
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {album.images.map((img, idx) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: (idx % 3) * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <div className="overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption}
                  loading="lazy"
                  className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 text-sm text-slate-600">{img.caption}</figcaption>
            </motion.figure>
          ))}
        </div>
      </PageSection>
    </div>
  );
}
