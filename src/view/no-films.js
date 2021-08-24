import AbstractView from './abstract.js';

const createNoFilmsBlock = () => (
  `<h2 class="films-list__title">There are no movies in our database
  </h2>`
);

export default class NoFilmsBlock extends AbstractView {
  getTemplate() {
    return createNoFilmsBlock();
  }
}
