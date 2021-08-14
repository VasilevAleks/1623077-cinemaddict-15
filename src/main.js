import {createSiteMenuTemplate} from './view/site-menu.js';
import {createStatisticTemplate} from './view/statistic.js';
import {createSortMenu} from './view/sort-films.js';
import {createFilmElement} from './view/site-films.js';
import {createFilmListContainer} from './view/film-list.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createMoreFilmsButton} from './view/more-films-button.js';
import {createTopList} from './view/top-films.js';
import {createCommentList} from './view/comment-films.js';
import {createPopapFilmTemplate} from './view/popap-film.js';
import {createFilmCard} from './mock.js';
import {generateFilter} from './filter.js';

const FILMS_COUNT = 23;
const FILMS_STEP = 5 ;
const EXTRA_FILMS_COUNT = 2;
const createArrayFilmsCards = createFilmCard(FILMS_COUNT);
const filter =  generateFilter(createArrayFilmsCards);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

render(siteMainElement, createSiteMenuTemplate(filter), 'beforeend');
render(siteMainElement, createSortMenu(), 'beforeend');
render(siteHeaderElement, createStatisticTemplate(), 'beforeend');
render(siteMainElement, createFilmElement(), 'beforeend');

const siteFilmsElement = siteMainElement.querySelector('.films');
render(siteFilmsElement, createFilmListContainer(), 'beforeend');
render(siteFilmsElement, createTopList(), 'beforeend');
render(siteFilmsElement, createCommentList(), 'beforeend');
const extraList= siteFilmsElement.querySelectorAll('.films-list--extra');

const filmList = siteFilmsElement.querySelector('.films-list');

const containerFilmList = filmList.querySelector('.films-list__container');

for (let i = 0; i < Math.min(createArrayFilmsCards.length, FILMS_STEP); i++) {
  render(containerFilmList, createFilmCardTemplate(createArrayFilmsCards[i]), 'beforeend');
}

if (createArrayFilmsCards.length > FILMS_STEP) {
  let renderedCount = FILMS_STEP;

  render(filmList, createMoreFilmsButton(), 'beforeend');

  const loadMoreButton = filmList.querySelector('.films-list__show-more');

  loadMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    createArrayFilmsCards
      .slice(renderedCount, renderedCount + FILMS_STEP)
      .forEach(() => render(containerFilmList, createFilmCardTemplate(createArrayFilmsCards), 'beforeend'));

    renderedCount += FILMS_STEP;

    if (renderedCount >= createArrayFilmsCards.length) {
      loadMoreButton.remove();
    }
  });
}

const createTopBlocks = (container) => {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(container, createFilmCardTemplate(createArrayFilmsCards[i]), 'beforeend');
  }
};

const topList = extraList[0];
const containerTopList = topList.querySelector('.films-list__container');

createTopBlocks(containerTopList);

const commentList = extraList[1];
const containerCommentList = commentList.querySelector('.films-list__container');

createTopBlocks(containerCommentList);render(siteMainElement, createPopapFilmTemplate(createArrayFilmsCards[0]), 'beforeend');
