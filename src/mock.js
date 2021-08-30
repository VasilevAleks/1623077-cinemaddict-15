import dayjs from 'dayjs';
import { nanoid } from 'nanoid';

const getRandomInteger = (min = 0, max = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFilmRating = (min = 0, max = 0) =>(Math.random() * (max - min + 1) + min).toFixed(2);

const FILMS = [
  'Made for each other',
  'Popeye meets sinbad',
  'Sagebrush trail',
  'Santa claus conquers the martians',
  'The dance of life',
  'The man with the golden arm',
];

const FILMS_URL = [
  'made-for-each-other.png',
  'popeye-meets-sinbad.png',
  'sagebrush-trail.jpg',
  'santa-claus-conquers-the-martians.jpg',
  'the-great-flamarion.jpg',
  'the-man-with-the-golden-arm.jpg',
];

const FILM_GENRES = [
  'Musical',
  'Blockbuster',
  'sci-fi',
  'Western',
  'Horror',
  'Animation',
  'Action',
];

const FILM_DIRECTORS = [
  'Steven Spielberg',
  'Peter Jackson',
  'Martin Scorsese',
  'Christopher Nolan',
  'Stephen Soderbergh',
  'Ridley Scott',
  'Quentin Tarantino',
];

const FILM_WRITERS = [
  'Paul Savage',
  'Veena Sud',
  'Matt Sazama',
  'Richard Side',
  'David Seidler',
  'Ira Sachs',
  'Michael Sucsy',
];

const FILM_ACTORS = [
  'Alan Rickman',
  'Benedict Cumberbatch',
  'Benicio del Toro',
  'Vincent Cassel',
  'Viggo Mortensen',
  'James McAvoy',
  'Daniel Radcliffe',
];

const FILM_RATING = [
  'G',
  'PG',
  'PG-13',
  'R',
  'NC-17',
];

const MIN_YEAR = 1920;
const MAX_YEAR = 2021;

const MAX_RATING = 9;

const MAX_DAY = 30;
const MIN_DAY = 1;

const MIN_MONTH = 1;
const MAX_MONTH = 12;

const MAX_DESCRIPTION_STRING = 5;
const MIN_DESCRIPTION_STRING = 1;

const POSTER_URL = '/images/posters/';

const MAX_COMMENTS = 5;
const MAX_HOUR_DURATION_FILM = 2;
const MAX_MINUTES_DURATION_FILM = 59;

const filmDescription = () => {
  const DESCRIPTIONS = [ //MESSAGE
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];
  const shuffledDescripton = DESCRIPTIONS.sort(()=> .5 - Math.random());
  return shuffledDescripton.slice(0,getRandomInteger(MIN_DESCRIPTION_STRING, MAX_DESCRIPTION_STRING));
};

const filmDuration = () => {
  const hours = getRandomInteger(0,MAX_HOUR_DURATION_FILM);
  const minutes = getRandomInteger(0,MAX_MINUTES_DURATION_FILM);
  return `${hours}h ${minutes}m`;
};

const EMOGI = 'images/emoji/';

const EMOTIONS = [
  'angry',
  'puke',
  'sleeping',
  'smile',
];

const AUTORS = [
  'Tom Hanks',
  'Leonardo DiCaprio',
  'Johnny Depp',
  'Christian Bale',
  'Liam Neeson',
  'Samuel Leroy Jackson',
  'Daniel Craig',
  'Benedict Cumberbatch',
  'David Tennant',
  'Tom Hardy',
];

const COMMENTS = [
  'WTF???',
  'Booooring',
  'Intresting',
  'Зеленый слоник все равно самый лудщий!!1!11!!',
  'WOW',
  'AWESOME!!!',
  'deserved an Oscar for Best Picture',
];

const PNG_FORMAT = '.png';

const getCommentDate = () => {
  const maxDaysGap = 600;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs('2019-06-06').add(daysGap, 'day').toDate();
};

const generateComments = (count) => {
  const comments = [];
  for (let index = 0; index <count; index++) {
    comments.push({
      emoji: `${EMOGI}${EMOTIONS[getRandomInteger(0,EMOTIONS.length-1)]}${PNG_FORMAT}`,
      text: COMMENTS[getRandomInteger(0,COMMENTS.length-1)] ,
      autor: AUTORS[getRandomInteger(0,AUTORS.length-1)],
      day: getCommentDate(),
    });
  }
  return comments;
};

export const createFilmCard = (count) => {
  const generateCard = [];

  for (let index = 0; index < count; index++){
    const getRandomYear = getRandomInteger(MIN_YEAR,MAX_YEAR);
    const getFullDate = () => {
      const day = getRandomInteger(MIN_DAY,MAX_DAY);
      const month = getRandomInteger(MIN_MONTH,MAX_MONTH);
      const formatFullDate = `${month}-${day}-${getRandomYear}`;
      return dayjs(formatFullDate).format('DD/MMMM/YYYY');
    };
    generateCard.push({
      id: nanoid(),
      title: FILMS[getRandomInteger(0,FILMS.length-1)],
      rating: getRandomFilmRating(0,MAX_RATING),
      url: `${POSTER_URL}${FILMS_URL[getRandomInteger(0,FILMS_URL.length-1)]}`,
      year: getRandomYear,
      duration: filmDuration(),
      genre: FILM_GENRES[getRandomInteger(0,FILM_GENRES.length-1)],
      description: filmDescription(),
      wathclist: Boolean(getRandomInteger(0, 1)),
      watched: Boolean(getRandomInteger(0, 1)),
      favorite: Boolean(getRandomInteger(0, 1)),
      comments: generateComments(getRandomInteger(1,MAX_COMMENTS)),
      fullDate:getFullDate(),
      director: FILM_DIRECTORS[getRandomInteger(0,FILM_DIRECTORS.length-1)],
      writers: FILM_WRITERS[getRandomInteger(0,FILM_WRITERS.length-1)],
      actors: FILM_ACTORS[getRandomInteger(0,FILM_ACTORS.length-1)],
      MPAA: FILM_RATING[getRandomInteger(0,FILM_RATING.length-1)],
    });
  }
  return generateCard;
};
