export const createCommentsFilm = (array) => {
  const {emoji, text, autor, day} = array;
  `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
         <span class="film-details__comment-author">${autor}</span>
          <span class="film-details__comment-day">${day}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
};
