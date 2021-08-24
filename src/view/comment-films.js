import AbstractView from './abstract.js';

const createCommentList = () => (
  `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>
</section>`);

export default class CommentList extends AbstractView {
  getTemplate() {
    return createCommentList();
  }
}
