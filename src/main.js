import {render, RenderPosition} from './render.js';
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

const FILMS_COUNT = 23;
const FILMS_STEP = 5;
const EXTRA_FILMS_COUNT = 2;
const createArrayFilmsCards = createFilmCard(FILMS_COUNT);
const filter =  generateFilter(createArrayFilmsCards);
const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');


render(siteMainElement, new SiteMenuView(filter), RenderPosition.BEFOREEND);
render(siteMainElement, new SortMenu(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Statistic(), RenderPosition.BEFOREEND);


const filmComponent = new FilmElement();
render(siteMainElement, filmComponent, RenderPosition.BEFOREEND);
const filmList = new FilmList();
render(filmComponent, filmList, RenderPosition.BEFOREEND);

const filmContainer = new FilmContainer();
render(filmList, filmContainer, RenderPosition.BEFOREEND);


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
    document.removeEventListener('keydown', onEscKeyDown);
  }
};

const OpenPopup = (card) => {
  render(siteMainElement, card, RenderPosition.BEFOREEND);
  bodyElement.classList.add('hide-overflow');
  document.addEventListener('keydown', onEscKeyDown);
};

const renderFilmCard = (containerElement, movie) => {
  const filmCard = new FilmCard(movie);
  const filmPopup = new PopupFilm(movie);

  filmCard.setTitleClickHandler(() => {
    OpenPopup(filmPopup);
  });

  filmCard.setPosterClickHandler(() => {
    OpenPopup(filmPopup);
  });
  filmCard.setDescriptionClickHandler(() => {
    OpenPopup(filmPopup);
  });
  filmCard.setCommentsClickHandler(() => {
    OpenPopup(filmPopup);
  });
  filmPopup.setCloseClickHandler(() => {
    closePopup(filmPopup);
  });

  render(containerElement, filmCard, RenderPosition.BEFOREEND);
};

if(createArrayFilmsCards.length === 0) {
  render(filmList, new NoFilmsBlock(), RenderPosition.BEFOREEND);
} else {
  for (let i = 0; i < Math.min(createArrayFilmsCards.length, FILMS_STEP); i++) {
    renderFilmCard(filmContainer.getElement(), createArrayFilmsCards[i]);
  }
}

if (createArrayFilmsCards.length > FILMS_STEP) {
  let renderedCount = FILMS_STEP;

  const loadMoreButton = new MoreFilmsButton();

  render(filmList, loadMoreButton, RenderPosition.BEFOREEND);

  loadMoreButton.setClickHandler(() => {
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
render(filmComponent, topList, RenderPosition.BEFOREEND);

const filmExtraTopContainer = new FilmContainer();

render(topList, filmExtraTopContainer, RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmExtraTopContainer, new FilmCard(createArrayFilmsCards[i]), RenderPosition.BEFOREEND);
}

const commentList = new CommentList();
render(filmComponent, commentList, RenderPosition.BEFOREEND);
const filmExtraCommentContainer = new FilmContainer();
render(commentList, filmExtraCommentContainer, RenderPosition.BEFOREEND);
for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmExtraCommentContainer, new FilmCard(createArrayFilmsCards[i]), RenderPosition.BEFOREEND);
}
