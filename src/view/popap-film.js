import SmartView from './smart.js';
import dayjs from 'dayjs';

const createPopapFilmTemplate = (array) => {
  const {title, rating, url, fullDate, duration, genre, country, alternaiveTitle, description, comments, director, writers, actors, MPAA, wathclist, watched, favorite} = array;

  const wathclistAddClass = wathclist === true ? 'film-details__control-button--active' : '';
  const watchedAddClass = watched === true ? 'film-details__control-button--active' : '';
  const favoriteAddClass = favorite === true ? 'film-details__control-button--active' : '';

  const createCommentsFilm = (commentArray) => {
    let result = '';
    for (const value of commentArray) {
      result +=
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
        <img src="${value.emoji}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${value.text}</p>
          <p class="film-details__comment-info">
           <span class="film-details__comment-author">${value.autor}</span>
            <span class="film-details__comment-day">$${dayjs(value.date).format('YYYY/MM/DD HH:mm')}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
    }
    return result;
  };

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${url}" alt="">

          <p class="film-details__age">${MPAA}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">${alternaiveTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${fullDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${wathclistAddClass}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${watchedAddClass}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${favoriteAddClass} " id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${createCommentsFilm(comments)}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" data-name="smile" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" data-name="sleeping" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" data-name="puke" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" data-name="angry" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

export default class PopupFilm extends SmartView {
  constructor(film) {
    super();
    this._data = PopupFilm.parseFilmToData(film);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._addEmojiClickHandler = this._addEmojiClickHandler.bind(this);
    this._commentTextAreaHandler = this._commentTextAreaHandler.bind(this);
    this._addedListClickHandler = this._addedListClickHandler.bind(this);
    this._newCommentHandler = this._newCommentHandler.bind(this);
    this._deleteCommentHandler = this._deleteCommentHandler.bind(this);
    this._setInnerHandlers();
  }

  getTemplate() {
    return createPopapFilmTemplate (this._data);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.film-details__emoji-list')
      .addEventListener('click', this._addEmojiClickHandler);
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentTextAreaHandler);
  }


  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseClickHandle(this._closeClickHandler);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
  }

  setCloseClickHandler(callback) {
    this._callback.closeClick = callback;
    this.getElement().querySelector('.film-details__close').addEventListener('click', this._closeClickHandler);
  }


  updateElement(newData) {
    this._data = PopupFilm.parseFilmToData(newData);
    this.restoreHandlers;
  }

  _addEmojiClickHandler(evt) {
    evt.preventDefault();

    if(evt.target.tagName !== 'IMG') {
      return;
    }
    const addEmojiContainer = this.getElement().querySelector('.film-details__add-emoji-label');
    addEmojiContainer.innerHTML = `<img src="./images/emoji/${evt.target.dataset.name}.png" width="55" height="55" alt="emoji-smile">`;

    this._data.newComment.emotion = evt.target.dataset.name;

    this.updateElement({
      emotion: evt.target.value,
    }, true);
  }

  _addedListClickHandler(evt) {
    evt.preventDefault();
    const category = evt.target.id;
    this._callback.addedListPopupClick(category);
  }

  _alreadyWatchedPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedPopupClick();
  }

  _addedFavoritesPopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.addedFavoritesPopupClick();
  }


  _newCommentHandler(evt) {
    const keyCode = evt.key;
    this._callback.newCommentKeyDown(keyCode, this._data);
  }

  _deleteCommentHandler(evt) {
    evt.preventDefault();
    if(evt.target.tagName !== 'BUTTON') {
      return;
    }
    const commentNumber = evt.target.dataset.number;
    this._callback.deleteCommentClick(commentNumber, this._data);
  }

  setNewCommentKeyDownHandler(callback) {
    this._callback.newCommentKeyDown = callback;
    document.addEventListener('keydown', this._newCommentHandler);
  }

  setDeleteCommentKeyDownHandler(callback) {
    this._callback.deleteCommentClick = callback;
    if(this._data.comments.length > 0) {
      this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._deleteCommentHandler);
    }
  }

  _commentTextAreaHandler(evt) {
    evt.preventDefault();
    this._data.newComment.text = evt.target.value;

    this.updateElement({
      commentText: evt.target.value,
    }, true);
  }

  static parseFilmToData(film) {

    const newComment = {
      text: '',
      emotion: '',
      author: 'nobody',
      date: '',
    };

    return Object.assign(
      {},
      film,
      {
        newComment,
      },
    );

  }

  static parseDataToFilm(data) {
    delete data.newComment;

    data = Object.assign({}, data);
    return data;
  }
}
