# Photo Gallery

A small, responsive React photo gallery built with Vite and Tailwind CSS. It loads 30 photos from the Picsum Photos API, filters the loaded photos by author, and saves favourite selections in the browser.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`.

## Structure

- `src/hooks/useFetchPhotos.ts` contains the Picsum request and loading/error state.
- `src/components/Gallery.tsx` composes the gallery, author search, memoized filtering, and reducer-managed favourites.
- `src/components/PhotoCard.tsx` renders an individual image, author, and favourite button.
- `src/index.css` loads Tailwind and sets the global page defaults.

The project uses no component library. Favourites are stored in `localStorage` under `photo-gallery:favourites:v1`.
