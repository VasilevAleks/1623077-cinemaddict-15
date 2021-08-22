import {createElement} from '../utils.js';

const createMoreFilmsButton = () => (`
<button class="films-list__show-more">Show more</button>
`);

export default class MoreFilmsButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoreFilmsButton();
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
