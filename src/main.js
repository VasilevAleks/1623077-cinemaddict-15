import {render, RenderPosition} from './render.js';
import Statistic from './view/statistic.js';
import FilmsModel from './modal/films.js';
import FiltersModel from './modal/filters.js';
import FilterPresenter from './presenter/filters.js';
import MovieList from './presenter/movielist.js';
import Api from './api.js';
import {UpdateType} from './const.js';
const AUTHORIZATION = 'Basic VasilevAnatolivichAleksander24';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();

render(siteHeaderElement, new Statistic(), RenderPosition.BEFOREEND);

const filterModel = new FiltersModel();
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();
const movieListPresenter = new MovieList(siteMainElement, filmsModel, filterModel);
movieListPresenter.init();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });


