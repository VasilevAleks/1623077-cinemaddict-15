/* eslint-disable no-shadow */
import FilmElement from '../view/site-films.js';
import FilmList from '../view/film-list.js';
import FilmContainer from '../view/film-container.js';
import NoFilmsBlock from '../view/no-films.js';
import MoreFilmsButton from '../view/more-films-button.js';
import SortMenu from '../view/sort-films.js';
import {sortMoviesByDate, sortMoviesByRating,filter} from '../utils.js';

import Film from './film.js';

import {render, RenderPosition, remove} from '../render.js';
import {sortType, UpdateType, FilterType, UserAction} from '../const.js';
const siteMainElement = document.querySelector('.main');
const FILMS_STEP = 5;

export default class MovieList {
  constructor(listContainer, filmsModel, filtersModel, api) {
    this._filmsModel = filmsModel;
    this._listContainer = listContainer;
    this._filtersModel = filtersModel;
    this._api = api;
    this._renderedFilmsCount = FILMS_STEP;
    this._filmPresenter = new Map();
    this._sortComponent = null;
    this._loadMoreButtonComponent = null;
    this._noFilmsComponent = null;

    this._filmComponent = new FilmElement();
    this._listComponent = new FilmList();
    this._containerComponent = new FilmContainer();


    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._renderSort = this._renderSort.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleStatusPopupChange = this._handleStatusPopupChange.bind(this);

    this._currentSortType = sortType.DEFAULT;
    this._filterType = FilterType.ALL;

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._listContainer,this._filmComponent, RenderPosition.BEFOREEND);
    this._filmsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
    this._renderMovieList();
  }

  _getFilms() {
    this._filterType = this._filtersModel.getFilter();

    const movies = this._filmsModel.getFilms().slice();
    const filteredMovies = filter[this._filterType](movies);

    switch (this._currentSortType) {
      case sortType.DATE:
        return filteredMovies.sort(sortMoviesByDate);
      case sortType.RATING:
        return filteredMovies.sort(sortMoviesByRating);
    }
    return filteredMovies;
  }

  _renderList() {
    render(this._filmComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderContainer() {
    render( this._listComponent,this._containerComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    this._noFilmsComponent = new NoFilmsBlock();
    render(this._listComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_LIST:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {

    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearFilmList();
        this._renderMovieList();

        if(this._prevFilmPresenter._statusPopup === this.statusPopup.OPEN) {
          this._prevFilmPresenter._closePopup();
        }
        break;
      case UpdateType.MAJOR:
        this._clearFilmList({resetRenderedFilmsCount: true, resetSortType: true});
        this._renderMovieList();
        break;
      case UpdateType.INIT:
        this._renderMovieList();
        break;
    }
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearFilmList({resetRenderedFilmsCount: true});
    this._renderMovieList();
  }

  _handleStatusPopupChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleLoadMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const newRenderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount + FILMS_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount, newRenderedFilmsCount);

    this._renderFilmCards(films);
    this._renderedFilmsCount = newRenderedFilmsCount;

    if (this._renderedFilmsCount >= this.filmsCount) {
      remove(this._moreFilmsButtonComponent);
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortMenu(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderMoreFilmsButton() {
    if (this._moreFilmsButtonComponent !== null) {
      this._moreFilmsButtonComponent = null;
    }
    this._moreFilmsButtonComponent = new MoreFilmsButton();
    render(this._listComponent, this._moreFilmsButtonComponent, RenderPosition.BEFOREEND);

    this._moreFilmsButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList({resetRenderedFilmCount = false, resetSortType = false} = {}) {

    const filmCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    remove(this._sortComponent);

    remove(this._moreFilmsButtonComponent);
    if (this._renderNoFilms()) {
      remove(this._noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this._renderedFilmsCount = FILMS_STEP;
    } else {
      this._renderedFilmsCount = Math.min(filmCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = sortType.DEFAULT;
    }
  }

  _renderFilmCard(movie) {
    const filmPresenter = new Film(this._containerComponent, this._handleViewAction, this._handleStatusPopupChange, this._api);
    filmPresenter.unit(movie);
    this._filmPresenter.set(movie.id, filmPresenter);
  }

  _renderFilmCards(films) {
    films.forEach((film) => this._renderFilmCard(film));
  }

  _renderMovieList() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if(filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderList();
    this._renderSort();
    this._renderContainer();

    this._renderFilmCards(
      films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)),
    );

    if (filmsCount > this._renderedFilmsCount) {
      this._renderMoreFilmsButton();
    }
  }
}
