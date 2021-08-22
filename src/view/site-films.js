import {createElement} from '../utils.js';

const createFilmElement = () => (
  `<section class="films">
  </section>`
);

export default class FilmElement {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmElement();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
