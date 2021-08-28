import FilmElement from '../view/site-films.js';
import FilmList from '../view/film-list.js';
import FilmContainer from '../view/film-container.js';
import NoFilmsBlock from '../view/no-films.js';
import MoreFilmsButton from '../view/more-films-button.js';

import Film from './film.js';

import {render, RenderPosition,remove} from '../render.js';
import {updateItem} from '../utils.js';

const FILMS_STEP = 5;

export default class MovieList {
  constructor(listContainer) {
    this._listContainer = listContainer;
    this._renderedFilmsCount = FILMS_STEP;
    this._filmPresenter = new Map();

    this._filmComponent = new FilmElement();
    this._listComponent = new FilmList();
    this._containerComponent = new FilmContainer();
    this._noFilmsComponent = new NoFilmsBlock();
    this._moreFilmsButtonComponent = new MoreFilmsButton();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(filmsArray) {
    this._filmsArray = filmsArray.slice();

    render(this._listContainer,this._filmComponent, RenderPosition.BEFOREEND);
    this._renderMovieList();
  }

  _renderList() {
    render(this._filmComponent, this._listComponent, RenderPosition.BEFOREEND);
  }

  _renderContainer() {
    render( this._listComponent,this._containerComponent, RenderPosition.BEFOREEND);
  }

  _renderNoFilms() {
    render(this._listComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _clearMovieList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmsCount = FILMS_STEP;
    remove(this._moreFilmsButtonComponent);
  }

  _handleMovieChange(updatedMovieList){

    this._filmsArray = updateItem(this._filmsArray, updatedMovieList);
    this._filmPresenter.get(updatedMovieList.id).unit(updatedMovieList);
  }

  _renderFilmCard(movie) {
    const filmPresenter = new Film(this._containerComponent, this._handleMovieChange);
    filmPresenter.unit(movie);
    this._filmPresenter.set(movie.id, filmPresenter);
  }

  _renderFilmCards(from, to) {
    this._filmsArray
      .slice(from, to)
      .forEach((filmsArray) => this._renderFilmCard(filmsArray));

  }

  _handleLoadMoreButtonClick() {

    this._renderFilmCards(this._renderedFilmsCount, this._renderedFilmsCount + FILMS_STEP);
    this._renderedFilmsCount += FILMS_STEP;

    if (this._renderedFilmsCount >= this._filmsArray.length) {
      remove(this._moreFilmsButtonComponent);
    }
  }

  _renderMoreFilmsButton() {
    render(this._listComponent, this._moreFilmsButtonComponent, RenderPosition.BEFOREEND);

    this._moreFilmsButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderFilmsBlocks() {
    this._renderFilmCards(0, Math.min(this._filmsArray.length, FILMS_STEP));

    if(this._filmsArray.length > FILMS_STEP) {
      this._renderMoreFilmsButton();
    }
  }

  _renderMovieList() {
    if(this._filmsArray.length === 0) {
      this._renderNoFilms();
    }

    this._renderList();
    this._renderContainer();
    this._renderFilmsBlocks();
  }
}
