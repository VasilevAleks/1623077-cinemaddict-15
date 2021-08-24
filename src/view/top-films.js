import AbstractView from './abstract.js';

const createTopList = () => (
  `<section class="films-list films-list--extra">
<h2 class="films-list__title">Top rated</h2>
</section>`);

export default class TopList extends AbstractView {
  getTemplate() {
    return createTopList();
  }
}
