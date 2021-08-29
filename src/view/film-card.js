import AbstractView from './abstract.js';

const createFilmCardTemplate = (array) => {
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

export default class FilmCard extends AbstractView {
  constructor(data) {
    super();
    this._data = data;

    this._clickFilmHandler = this._clickFilmHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._wathclistClickHandler = this._wathclistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._data);
  }

  _clickFilmHandler(evt) {
    evt.preventDefault();
    this._callback.filmBlockClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _wathclistClickHandler(evt) {
    evt.preventDefault();
    this._callback.wathclistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setPopupClickHandler(callback) {
    this._callback.filmBlockClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickFilmHandler);
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickFilmHandler);
    this.getElement().querySelector('.film-card__description').addEventListener('click', this._clickFilmHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickFilmHandler);

  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWathclistClickHandler(callback) {
    this._callback.wathclistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._wathclistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }
}
