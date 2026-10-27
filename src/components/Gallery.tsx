import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import type { ChangeEvent } from 'react';
import { PhotoCard } from './PhotoCard';
import { useFetchPhotos } from '../hooks/useFetchPhotos';

const FAVORITES_STORAGE_KEY = 'photo-gallery:favourites:v1';

type FavoritesAction = { type: 'toggle'; photoId: string };

function readSavedFavorites(): string[] {
  try {
    const savedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!savedValue) return [];

    const parsedValue: unknown = JSON.parse(savedValue);
    if (!Array.isArray(parsedValue)) return [];

    return parsedValue.filter((value): value is string => typeof value === 'string');
  } catch {
    return [];
  }
}

function favoritesReducer(state: string[], action: FavoritesAction): string[] {
  switch (action.type) {
    case 'toggle':
      return state.includes(action.photoId)
        ? state.filter((photoId) => photoId !== action.photoId)
        : [...state, action.photoId];
    default:
      return state;
  }
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Gallery() {
  const { photos, loading, error } = useFetchPhotos();
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, dispatchFavorites] = useReducer(
    favoritesReducer,
    undefined,
    readSavedFavorites,
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // The gallery remains usable if browser storage is unavailable.
    }
  }, [favoriteIds]);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.currentTarget.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    if (!query) return photos;

    return photos.filter((photo) => photo.author.toLocaleLowerCase().includes(query));
  }, [photos, searchQuery]);

  const handleFavoriteToggle = useCallback((photoId: string) => {
    dispatchFavorites({ type: 'toggle', photoId });
  }, []);

  return (
    <main className="min-h-screen bg-paper text-ink">
      <header className="border-b border-[#e4e8e2]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <a href="/" aria-label="Photo Gallery home" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-white">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                <rect x="3.2" y="4.2" width="17.6" height="15.6" rx="2.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="8.3" cy="9" r="1.5" fill="currentColor" />
                <path d="m5 17 4.2-4.1 2.9 2.6 2.1-2 4.8 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">Photo Gallery</span>
          </a>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8780] sm:inline">
            A collection of moments
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 sm:px-8 lg:px-12">
        <section className="flex flex-col gap-8 py-10 sm:py-14 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              The photo collection
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]">
              Everyday moments, <span className="text-forest">beautifully seen.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#65716a]">
              Browse the collection and find the photographers behind each frame.
            </p>
          </div>

          <div className="w-full lg:max-w-[370px]">
            <label htmlFor="author-search" className="mb-2 block text-sm font-medium text-[#34423b]">
              Search by author
            </label>
            <div className="flex h-12 items-center gap-3 rounded-xl border border-[#dfe5de] bg-white px-4 shadow-sm transition focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/15">
              <span className="text-[#829087]"><SearchIcon /></span>
              <input
                id="author-search"
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Type an author's name"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-[#9aa39d]"
                autoComplete="off"
              />
            </div>
          </div>
        </section>

        <section aria-label="Photo gallery">
          {loading && (
            <div role="status" className="flex min-h-64 flex-col items-center justify-center gap-4 text-[#68766e]">
              <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#dce5df] border-t-forest" />
              <span className="text-sm">Loading photographs…</span>
            </div>
          )}

          {!loading && error && (
            <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
              <p className="text-base font-semibold text-rose-900">Photos are unavailable</p>
              <p className="mt-2 text-sm text-rose-800">{error}</p>
            </div>
          )}

          {!loading && !error && filteredPhotos.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favoriteIds.includes(photo.id)}
                  onToggleFavorite={handleFavoriteToggle}
                />
              ))}
            </div>
          )}

          {!loading && !error && filteredPhotos.length === 0 && (
            <p className="rounded-2xl border border-[#e4e8e2] bg-white px-6 py-12 text-center text-sm text-[#65716a]">
              No photographers match “{searchQuery}”.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
