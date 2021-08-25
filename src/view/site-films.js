import AbstractView from './abstract.js';

const createFilmElement = () => (
  `<section class="films">
  </section>`
);

export default class FilmElement extends AbstractView {
  getTemplate() {
    return createFilmElement();
  }
}
