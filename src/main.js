import {render, RenderPosition} from './render.js';
import Statistic from './view/statistic.js';
import FilmsModel from './modal/films.js';
import FiltersModel from './modal/filters.js';
import FilterPresenter from './presenter/filters.js';
import MovieList from './presenter/movielist.js';
import Api from './api.js';
import {UpdateType,AUTHORIZATION, END_POINT} from './const.js';
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FiltersModel();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

render(siteHeaderElement, new Statistic(), RenderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();
const movieListPresenter = new MovieList(siteMainElement, filmsModel, filterModel, api);
movieListPresenter.init();

