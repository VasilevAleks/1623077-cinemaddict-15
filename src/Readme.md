Папка для скриптов.

const filmComponent = new FilmElement();
render(siteMainElement, filmComponent, RenderPosition.BEFOREEND);
const filmList = new FilmList();
render(filmComponent, filmList, RenderPosition.BEFOREEND);

const filmContainer = new FilmContainer();
render(filmList, filmContainer, RenderPosition.BEFOREEND);

const renderFilmCard = (containerElement, movie) => {
  const filmCard = new FilmCard(movie);
  const filmPopup = new PopupFilm(movie);

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
    render(siteMainElement, card, RenderPosition.BEFOREEND);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  };

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


