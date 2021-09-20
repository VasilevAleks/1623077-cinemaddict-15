import AbstractObserver from '../utils.js';
import { FilterType } from '../const.js';

export default class FiltersModel extends AbstractObserver{
  constructor() {
    super();
    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }

}
