import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { GalleryAlbum } from '@/types';

interface GalleryAlbumCardProps {
  album: GalleryAlbum;
}

export default function GalleryAlbumCard({ album }: GalleryAlbumCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link
        to={`/gallery/${album.id}`}
        className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
      >
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={album.coverImage}
            alt={album.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white">
            {album.images.length} photos
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-slate-900">{album.title}</h3>
          <p className="text-xs text-slate-400">{album.date}</p>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{album.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
