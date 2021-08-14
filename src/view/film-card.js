export const createFilmCardTemplate = (array) => {
  const {title,rating,url,year,duration,genre,description,comments, wathclist, watched, favorite} = array;

  const wathclistAddClass = wathclist === true ? 'film-card__controls-item--active' : '';
  const watchedAddClass = watched === true ? 'film-card__controls-item--active' : '';
  const favoriteAddClass = favorite === true ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${url}" alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${wathclistAddClass}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${watchedAddClass}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteAddClass}" type="button">Mark as favorite</button>
  </div>
</article>`;
};
