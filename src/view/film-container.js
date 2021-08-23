import {createElement} from '../utils.js';

const createFilmContainer = () => (
  `<div class="films-list__container">
</div>`);

export default class FilmContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmContainer();
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
