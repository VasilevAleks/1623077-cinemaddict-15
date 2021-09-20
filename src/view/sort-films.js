import AbstractView from './abstract.js';
import {sortType} from '../const.js';

const createSortMenu = (currentSortType) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button ${currentSortType === sortType.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${sortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${currentSortType === sortType.DATE ? 'sort__button--active' : ''}" data-sort-type="${sortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${currentSortType === sortType.RATING ? 'sort__button--active' : ''}" data-sort-type="${sortType.RATING}">Sort by rating</a></li>
  </ul>`
);


export default class SortMenu extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortMenu(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {

    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
