# Project TODO

## Photo loading and request states
- [x] Fetch 30 photos on initial load from `https://picsum.photos/v2/list?limit=30` through a custom `useFetchPhotos` hook that returns `photos`, `loading`, and `error`.
- [x] Show a loading spinner while photos are being fetched and an error message if the request fails.
- [x] The Gallery component consumes `useFetchPhotos` and does not fetch data directly.

## Responsive photo gallery
- [x] Display all fetched photos as cards in a responsive grid: 4 columns on desktop, 2 on tablet, and 1 on mobile.
- [x] Each card shows the photo, author name, and a heart icon button.

## Author search
- [x] Provide a search input at the top that filters the already-fetched photos by author name in real time, without a page reload and without another API request.
- [x] Use `useCallback` for the search filter handler and `useMemo` to compute the filtered photo list.

## Persistent favourites
- [x] The heart button toggles whether a photo is a favourite.
- [x] Manage favourite state with `useReducer`, not `useState`.
- [x] Persist favourite selections in `localStorage` so they remain across page refreshes.

## Project scope and implementation
- [x] Use React + Vite, Tailwind CSS for all styling, and functional components only; do not use component/UI libraries or class components.
- [x] Keep the interface limited to the requested gallery scope, without third-party attribution in the user-facing UI.
- [x] Keep the interface clean, readable, and responsive.
