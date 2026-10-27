import { useEffect, useState } from 'react';

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface UseFetchPhotosResult {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const PHOTOS_ENDPOINT = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos(): UseFetchPhotosResult {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPhotos() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(PHOTOS_ENDPOINT, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Photo request failed with status ${response.status}`);
        }

        const result: unknown = await response.json();
        if (!Array.isArray(result)) {
          throw new Error('The photo service returned an unexpected response.');
        }

        setPhotos(result as Photo[]);
      } catch (caughtError) {
        if (caughtError instanceof DOMException && caughtError.name === 'AbortError') {
          return;
        }

        setError('We couldn’t load the photos. Please try again later.');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadPhotos();
    return () => controller.abort();
  }, []);

  return { photos, loading, error };
}
