import { galleryAlbums } from '@/data/gallery';
import PageHero from '@/components/layout/PageHero';
import PageSection from '@/components/layout/PageSection';
import GalleryAlbumCard from '@/components/cards/GalleryAlbumCard';

export default function GalleryPage() {
  const totalPhotos = galleryAlbums.reduce((s, a) => s + a.images.length, 0);

  return (
    <div className="relative">
      <PageHero
        compact
        eyebrow="Moments"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Gallery' }]}
        title="Gallery"
        subtitle="Photos from our events, workshops and expos — a look back at what the chapter has been up to."
        meta={[
          { value: `${galleryAlbums.length}`, label: 'Albums' },
          { value: `${totalPhotos}`, label: 'Photos' },
        ]}
      />

      <PageSection tone="cream" top>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryAlbums.map((album) => (
            <GalleryAlbumCard key={album.id} album={album} />
          ))}
        </div>
      </PageSection>
    </div>
  );
}
