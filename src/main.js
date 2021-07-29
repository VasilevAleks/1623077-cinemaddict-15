import {createSiteMenuTemplate} from './view/site-menu.js';
import {createStatisticTemplate} from './view/statistic.js';
import {createSortMenu} from './view/sort-films.js';
import {createFilmElement} from './view/site-films.js';
import {createFilmListContainer} from './view/film-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createMoreFilmsButton} from './view/more-films-button.js';
import {createTopList} from './view/top-films.js';
import {createCommentList} from './view/comment-films.js';

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortMenu(), 'beforeend');
render(siteHeaderElement, createStatisticTemplate(), 'beforeend');
render(siteMainElement, createFilmElement(), 'beforeend');

const siteFilmsElement = siteMainElement.querySelector('.films');
render(siteFilmsElement, createFilmListContainer(), 'beforeend');
render(siteFilmsElement, createTopList(), 'beforeend');
render(siteFilmsElement, createCommentList(), 'beforeend');
const extraList= siteFilmsElement.querySelectorAll('.films-list--extra');

const filmList = siteFilmsElement.querySelector('.films-list');
render(filmList, createMoreFilmsButton(), 'beforeend');
const containerFilmList = filmList.querySelector('.films-list__container');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(containerFilmList, createFilmCardTemplate(), 'beforeend');
}

const createTopBlocks = (container) => {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(container, createFilmCardTemplate(), 'beforeend');
  }
};

const topList = extraList[0];
const containerTopList = topList.querySelector('.films-list__container');

createTopBlocks(containerTopList);

const commentList = extraList[1];
const containerCommentList = commentList.querySelector('.films-list__container');

createTopBlocks(containerCommentList);
