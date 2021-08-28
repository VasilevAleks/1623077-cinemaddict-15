import {render, RenderPosition} from './render.js';
import SiteMenuView from './view/site-menu.js';
import Statistic from './view/statistic.js';
import SortMenu from './view/sort-films.js';

//import TopList from './view/top-films.js';
//import CommentList from './view/comment-films.js';

import MovieList from './presenter/movielist.js';
import {createFilmCard} from './mock.js';
import {generateFilter} from './filter.js';

const FILMS_COUNT = 23;
//const EXTRA_FILMS_COUNT = 2;
const createArrayFilmsCards = createFilmCard(FILMS_COUNT);
const filter =  generateFilter(createArrayFilmsCards);
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


render(siteMainElement, new SiteMenuView(filter), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenu(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Statistic(), RenderPosition.BEFOREEND);

const MovielistPresenter = new MovieList(siteMainElement);
MovielistPresenter.init(createArrayFilmsCards);
