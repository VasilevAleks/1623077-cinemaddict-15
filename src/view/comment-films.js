import {createElement} from '../utils.js';

const createCommentList = () => (
  `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>
</section>`);

export default class CommentList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createCommentList();
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
