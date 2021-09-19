import {render, RenderPosition} from './render.js';
import Statistic from './view/statistic.js';
import FilmsModel from './modal/films.js';
import FiltersModel from './modal/filters.js';
import FilterPresenter from './presenter/filters.js';
import MovieList from './presenter/movielist.js';
import {createFilmCard} from './mock.js';

const FILMS_COUNT = 23;
const createArrayFilmsCards = createFilmCard(FILMS_COUNT);
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const filmsModel = new FilmsModel();
filmsModel.setFilms(createArrayFilmsCards);

render(siteHeaderElement, new Statistic(), RenderPosition.BEFOREEND);

const filterModel = new FiltersModel();
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

const movieListPresenter = new MovieList(siteMainElement, filmsModel, filterModel);
movieListPresenter.init();

