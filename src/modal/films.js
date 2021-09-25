import AbstractObserver from '../utils.js';
import dayjs from 'dayjs';

export default class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  setComments(comments) {
    this._films.comments = comments;
  }

  getFilms() {
    return this._films;
  }

  addComment(updateType, update) {
    this._notify(updateType, update);
  }

  updateFilm(updateType, update) {

    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting ');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedFilms = Object.assign(
      {},
      movie,
      {
        id: Number(movie['id']),
        comments: movie.comments,
        country: movie['film_info'].release['release_country'],
        title: movie['film_info'].title,
        alternaiveTitle: movie['film_info']['alternative_title'],
        rating: movie['film_info']['total_rating'],
        url: movie['film_info'].poster,
        year: dayjs(movie['film_info'].release.date).format('YYYY'),
        duration: movie['film_info'].runtime,
        genre: movie['film_info'].genre,
        description: movie['film_info'].description,
        wathclist: movie['user_details'].watchlist,
        watched: movie['user_details']['already_watched'],
        favorite: movie['user_details'].favorite,
        fullDate: dayjs(movie['film_info'].release.date).format('D MMMM YYYY'),
        director: movie['film_info'].director,
        writers: movie['film_info'].writers.join(', '),
        actors:  movie['film_info'].actors.join(', '),
        MPAA: `${movie['film_info']['age_rating']}+`,
        watchingDate: dayjs(movie['user_details']['watching_date']).format('YYYY/MM/DD HH:mm'),
        serverFormatDate: movie['user_details']['watching_date'],
        serverRelizeDateFormat: movie['film_info'].release.date,
      },
    );
    delete adaptedFilms.film_info;
    delete adaptedFilms.user_details;

    return adaptedFilms;
  }

  static adaptToServer(film) {

    const userDetails = {
      watchlist: film.wathclist,
      'already_watched': film.watched,
      favorite: film.favorite,
      'watching_date': film.serverFormatDate,
    };

    const relizeData = {
      date: film.serverRelizeDateFormat,
      'release_country': film.country,
    };

    const filmInfo = {
      actors: film.actors.split(', '),
      'age_rating': +film.MPAA.slice(0, Array.from(film.ageRating).length - 1),
      'alternative_title': film.alternaiveTitle,
      description: film.description,
      director: film.director,
      genre: film.genre,
      poster: film.poster,
      release: film.fullDate,
      runtime: film.duration,
      title: film.title,
      'total_rating': film.rating,
      writers: film.writers.split(', '),
      relizeData,

    };

    const getCommentsId = () => {

      if(film.comments.length === 0) {
        return [];
      }

      const commentsId = new Array;

      if(film.comments[0].id) {
        film.comments.forEach((comment) => {
          commentsId.push(comment.id);
        });
        return commentsId;
      }

      film.comments.forEach((comment) => {
        commentsId.push(comment);
      });
      return commentsId;
    };

    const commentsIdArray = getCommentsId();

    const adaptedFilm = Object.assign(
      {
        'id': film.id,
        'user_details': userDetails,
        comments: commentsIdArray,
        'film_info': filmInfo,
      },
    );

    delete adaptedFilm.wathclist;
    delete adaptedFilm.watched;
    delete adaptedFilm.favorite;
    delete adaptedFilm.id;
    delete adaptedFilm.actors;
    delete adaptedFilm.MPAA;
    delete adaptedFilm.country;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.duration;
    delete adaptedFilm.genre;
    delete adaptedFilm.title;
    delete adaptedFilm.url;
    delete adaptedFilm.year;
    delete adaptedFilm.rating;
    delete adaptedFilm.fullDate;
    delete adaptedFilm.writers;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.noComments;
    delete adaptedFilm.alternaiveTitle;
    delete adaptedFilm.serverFormatDate;
    delete adaptedFilm.serverRelizeDateFormat;

    return adaptedFilm;
  }
}
