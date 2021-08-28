
import FilmCard from '../view/film-card.js';
import PopupFilm from '../view/popap-film.js';
import {render, RenderPosition, replace,remove} from '../render.js';
const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');

export default class Film {
  constructor(filmListContainer, movieChange) {
    this._filmListContainer = filmListContainer;
    this._movieChange = movieChange;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._closePopup = this._closePopup.bind(this);
    this._openPopup = this._openPopup.bind(this);
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

    this._renderFilmCard();


    if (prevFilmCardComponent === null || prevFilmPopupComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmListContainer.getElement().contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    this._movieChange(movie);
    remove(prevFilmCardComponent);
    remove(prevFilmPopupComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
  }

  _closePopup() {
    const popupElement = document.querySelector('.film-details');
    if (popupElement) {
      siteMainElement.removeChild(popupElement);
    }
    bodyElement.classList.remove('hide-overflow');
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

  _renderFilmCard() {
    this._filmCardComponent.setTitleClickHandler(() => {
      this._openPopup();
    });

    this._filmCardComponent.setPosterClickHandler(() => {
      this._openPopup();
    });

    this._filmCardComponent.setDescriptionClickHandler(() => {
      this._openPopup();
    });

    this._filmCardComponent.setCommentsClickHandler(() => {
      this._openPopup();
    });
    this._filmPopupComponent.setCloseClickHandler(() => {
      this._closePopup();
    });
    this._filmCardComponent.setFavoriteClickHandler(() => {
      this.__handleFavoriteClick();
    });
    this._filmCardComponent.setWathclistClickHandler(() => {

      this._handleWatchlistClick();
    });
    this._filmCardComponent.setWatchedClickHandler(() => {
      this._handleWatchedClick();
    });
  }

}

