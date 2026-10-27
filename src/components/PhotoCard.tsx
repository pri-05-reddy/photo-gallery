import type { Photo } from '../hooks/useFetchPhotos';

interface PhotoCardProps {
  photo: Photo;
  isFavorite: boolean;
  onToggleFavorite: (photoId: string) => void;
}

export function PhotoCard({ photo, isFavorite, onToggleFavorite }: PhotoCardProps) {
  const imageUrl = photo.download_url.replace(/\/\d+\/\d+$/, '/960/720');

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e7eae5] bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9ece7]">
        <img
          src={imageUrl}
          alt={`Photograph by ${photo.author}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          aria-label={isFavorite ? `Remove ${photo.author} photo from favourites` : `Add ${photo.author} photo to favourites`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(photo.id)}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 ${
            isFavorite ? 'text-rose-600' : 'text-[#52615b] hover:text-rose-600'
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 8.9c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.6 4.6 0 0 1 8.8-1.8 4.6 4.6 0 0 1 8.8 1.8Z"
            />
          </svg>
        </button>
      </div>

      <div className="px-4 py-4 sm:px-5">
        <p className="truncate text-sm font-medium text-ink">{photo.author}</p>
      </div>
    </article>
  );
}
