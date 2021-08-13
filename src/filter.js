const filmToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.wathclist).length,
  history: (films) => films
    .filter((film) => film.watched).length,
  favorites: (films) => films
    .filter((film) => film.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
