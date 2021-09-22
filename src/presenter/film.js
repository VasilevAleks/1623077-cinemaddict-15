import FilmCard from '../view/film-card.js';
import PopupFilm from '../view/popap-film.js';
import {UserAction, UpdateType, SUBMIT_KEY_CODE } from '../const.js';
import {render, RenderPosition, replace, remove} from '../render.js';
import dayjs from 'dayjs';
const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');

const statusPopup = {
  OPEN: 'Open',
  CLOSE: 'Close',
};


export default class Film {
  constructor(filmListContainer, movieChange, changeStatusPopup, api) {
    this._filmListContainer = filmListContainer;
    this._movieChange = movieChange;
    this._changeStatusPopup = changeStatusPopup;
    this._api = api;

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
    this._handlerAddNewComment = this._handlerAddNewComment.bind(this);
    this._handlerDeleteComment = this._handlerDeleteComment.bind(this);
  }

  unit(movie) {
    this._movie = movie;
    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmCardComponent = new FilmCard(movie);
    this._filmPopupComponent = new PopupFilm(movie, this._api);

    this._filmCardComponent.setPopupClickHandler(this._handlePopupClick);
    this._filmPopupComponent.setCloseClickHandler(this._handleClosePopupClick);
    this._filmPopupComponent.setNewCommentKeyDownHandler(this._addNewCommentHandler);
    this._filmPopupComponent.setDeleteCommentKeyDownHandler(this._deleteCommentHandler);
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

  _addNewComment(commentData) {
    commentData.newComment.date = dayjs().format('YYYY/MM/DD HH:mm');
    commentData.comments.push(commentData.newComment);

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        commentData,
      ),
    );

    commentData.newComment = {
      text: '',
      emotion: '',
      date: '',
    };
  }

  _handlerAddNewComment(keyCode, commentData) {
    if(SUBMIT_KEY_CODE.indexOf(keyCode) === -1) {
      this._pressed.clear();
      return;
    }

    this._pressed.add(keyCode);

    for (const code of SUBMIT_KEY_CODE) {
      if (!this._pressed.has(code)) {
        return;
      }
    }
    this._pressed.clear();

    if(commentData.newComment.emotion === '' || commentData.newComment.text === '') {
      return;
    }
    this._addNewComment(commentData);
  }

  _handlerDeleteComment(commentNumber, commentData) {
    commentData.comments.splice(commentNumber, 1);

    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      Object.assign(
        {},
        commentData,
      ),
    );
  }

  _handleFavoriteClick() {
    this._movieChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
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
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
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
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
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

