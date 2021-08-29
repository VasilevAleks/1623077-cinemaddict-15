
import FilmCard from '../view/film-card.js';
import PopupFilm from '../view/popap-film.js';
import {render, RenderPosition, replace, remove} from '../render.js';
const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');

const statusPopup = {
  OPEN: 'Open',
  CLOSE: 'Close',
};


export default class Film {
  constructor(filmListContainer, movieChange, changeStatusPopup) {
    this._filmListContainer = filmListContainer;
    this._movieChange = movieChange;
    this._changeStatusPopup = changeStatusPopup;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._statusPopup = statusPopup.CLOSE;

    this._closePopup = this._closePopup.bind(this);
    this._openPopup = this._openPopup.bind(this);
    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._handleClosePopupClick = this._handleClosePopupClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
  }

  unit(movie) {
    this._movie = movie;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;

    this._filmCardComponent = new FilmCard(movie);
    this._filmPopupComponent = new PopupFilm(movie);

    this._filmCardComponent.setPopupClickHandler(this._handlePopupClick);
    this._filmPopupComponent.setCloseClickHandler(this._handleClosePopupClick);
    this._renderFilmCard();

    if (prevFilmCardComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmCardComponent, prevFilmCardComponent);
    replace(this._filmPopupComponent, prevFilmCardComponent);
    remove(prevFilmCardComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
  }

  resetView() {
    if (this._statusPopup !== statusPopup.CLOSE) {
      this._closePopup();
    }
  }

  _closePopup() {
    remove(this._filmPopupComponent);
    bodyElement.classList.remove('hide-overflow');
    this._statusPopup = statusPopup.CLOSE;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();

      this._closePopup();
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  }

  _openPopup() {
    render(siteMainElement, this._filmPopupComponent, RenderPosition.BEFOREEND);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeStatusPopup();
    this._statusPopup = statusPopup.OPEN;
  }

  _handleFavoriteClick() {
    this._movieChange(
      Object.assign(
        {},
        this._movie,
        {
          favorite: !this._movie.favorite,
        },
      ),
    );
  }

  _handleWatchlistClick() {
    this._movieChange(
      Object.assign(
        {},
        this._movie,
        {
          wathclist: !this._movie.wathclist,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._movieChange(
      Object.assign(
        {},
        this._movie,
        {
          watched: !this._movie.watched,
        },
      ),
    );
  }

  _handlePopupClick() {
    this._openPopup();
  }

  _handleClosePopupClick() {
    this._closePopup();
  }


  _renderFilmCard() {

    this._filmCardComponent.setFavoriteClickHandler(() => {
      this._handleFavoriteClick();
    });
    this._filmCardComponent.setWathclistClickHandler(() => {

      this._handleWatchlistClick();
    });
    this._filmCardComponent.setWatchedClickHandler(() => {
      this._handleWatchedClick();
    });

  }

}

