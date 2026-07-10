import { galleryAlbums } from '@/data/gallery';
import GalleryAlbumCard from '@/components/cards/GalleryAlbumCard';

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Gallery</h1>
      <p className="mt-2 text-slate-600">Photos from our events, workshops, and expos.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleryAlbums.map((album) => (
          <GalleryAlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
}
