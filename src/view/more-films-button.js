import AbstractView from './abstract.js';

const createMoreFilmsButton = () => '<button class="films-list__show-more">Show more</button>';

export default class MoreFilmsButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMoreFilmsButton();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this.getElement().addEventListener('click', this._clickHandler);
    this._callback.click = callback;
  }
}
