
import {render, RenderPosition} from './utils.js';
import SiteMenuView from './view/site-menu.js';
import Statistic from './view/statistic.js';
import SortMenu from './view/sort-films.js';
import FilmElement from './view/site-films.js';
import FilmList from './view/film-list.js';
import FilmContainer from './view/film-container.js';
import MoreFilmsButton from './view/more-films-button.js';

import FilmCard from './view/film-card.js';

import TopList from './view/top-films.js';
import CommentList from './view/comment-films.js';
import PopupFilm from './view/popap-film.js';
import NoFilmsBlock from './view/no-films.js';

import {createFilmCard} from './mock.js';
import {generateFilter} from './filter.js';

const FILMS_COUNT = 0;
const FILMS_STEP = 5;
const EXTRA_FILMS_COUNT = 2;
const createArrayFilmsCards = createFilmCard(FILMS_COUNT);
const filter =  generateFilter(createArrayFilmsCards);
const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


render(siteMainElement, new SiteMenuView(filter).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenu().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Statistic().getElement(), RenderPosition.BEFOREEND);


const filmComponent = new FilmElement();
render(siteMainElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
const filmList = new FilmList();
render(filmComponent.getElement(), filmList.getElement(), RenderPosition.BEFOREEND);

const filmContainer = new FilmContainer();
render(filmList.getElement(), filmContainer.getElement(), RenderPosition.BEFOREEND);


const closePopup = () => {
  const popupElement = document.querySelector('.film-details');
  if (popupElement) {
    siteMainElement.removeChild(popupElement);
  }
  bodyElement.classList.remove('hide-overflow');
};

const onEscKeyDown = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const OpenPopup = (card) => {
  render(siteMainElement, card.getElement(), RenderPosition.BEFOREEND);
  bodyElement.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
};

const renderFilmCard = (containerElement, movie) => {
  const filmCard = new FilmCard(movie);
  const filmPopup = new PopupFilm(movie);

  filmCard.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    OpenPopup(filmPopup);
  });
  filmCard.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    OpenPopup(filmPopup);
  });
  filmCard.getElement().querySelector('.film-card__description').addEventListener('click', () => {
    OpenPopup(filmPopup);
  });
  filmCard.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    OpenPopup(filmPopup);
  });
  filmPopup.getElement().querySelector('.film-details__close').addEventListener('click', () => {
    closePopup(filmPopup);
  });

  render(containerElement, filmCard.getElement(), RenderPosition.BEFOREEND);
};

if(createArrayFilmsCards.length === 0) {
  render(filmList.getElement(), new NoFilmsBlock().getElement(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < Math.min(createArrayFilmsCards.length, FILMS_STEP); i++) {
    renderFilmCard(filmContainer.getElement(), createArrayFilmsCards[i]);
  }
}

if (createArrayFilmsCards.length > FILMS_STEP) {
  let renderedCount = FILMS_STEP;

  const loadMoreButton = new MoreFilmsButton();

  render(filmList.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);

  loadMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    createArrayFilmsCards
      .slice(renderedCount, renderedCount + FILMS_STEP)
      .forEach((array) => renderFilmCard(filmContainer.getElement(), array));

    renderedCount += FILMS_STEP;

    if (renderedCount >= createArrayFilmsCards.length) {
      loadMoreButton.getElement().remove();
      loadMoreButton.removeElement();
    }
  });
}

const topList = new TopList();
render(filmComponent.getElement(), topList.getElement(), RenderPosition.BEFOREEND);

const filmExtraTopContainer = new FilmContainer();

render(topList.getElement(), filmExtraTopContainer.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmExtraTopContainer.getElement(), new FilmCard(createArrayFilmsCards[i]).getElement(), RenderPosition.BEFOREEND);
}

const commentList = new CommentList();
render(filmComponent.getElement(), commentList.getElement(), RenderPosition.BEFOREEND);
const filmExtraCommentContainer = new FilmContainer();
render(commentList.getElement(), filmExtraCommentContainer.getElement(), RenderPosition.BEFOREEND);
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmExtraCommentContainer.getElement(), new FilmCard(createArrayFilmsCards[i]).getElement(), RenderPosition.BEFOREEND);
}
