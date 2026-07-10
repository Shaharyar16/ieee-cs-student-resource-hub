import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { galleryAlbums } from '@/data/gallery';
import EmptyState from '@/components/ui/EmptyState';
import Icon from '@/components/ui/Icon';

export default function GalleryAlbumPage() {
  const { id } = useParams();
  const album = galleryAlbums.find((a) => a.id === id);

  if (!album) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14">
        <EmptyState title="Album not found" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <Link to="/gallery" className="inline-flex items-center gap-1.5 text-sm font-medium text-ieee-blue hover:underline">
        <Icon name="arrow-left" className="h-4 w-4" /> All Albums
      </Link>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">{album.title}</h1>
      <p className="mt-1 text-sm text-slate-400">{album.date}</p>
      <p className="mt-3 text-slate-600">{album.description}</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {album.images.map((img, idx) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <img src={img.url} alt={img.caption} className="h-52 w-full object-cover" />
            <p className="p-3 text-sm text-slate-600">{img.caption}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
