import { getUniqueRandomId, getRandomInteger } from './utils.js';

export const NAMES = [
  'Irishka220',
  'MaxCool',
  'Boris_Redwall',
  'MiniCat',
  'MariaBlog'
];

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

export const MAX_PHOTOS_COUNT = 25;

export const IdNumber = {
  MIN: 1,
  MAX: 25
};

export const LikesCount = {
  MIN: 15,
  MAX: 200
};

export const UrlNumber = {
  MIN: 1,
  MAX: 25
};

export const CommentsCount = {
  MIN: 0,
  MAX: 30
};

export const AvatarNumber = {
  MIN: 1,
  MAX: 6,
};

const usedId = [];
const getId = () => getUniqueRandomId(IdNumber.MIN,IdNumber.MAX,usedId);

const usedUrlIndex = [];
const getUrlIndex = () => getUniqueRandomId(UrlNumber.MIN, UrlNumber.MAX, usedUrlIndex);

const getLikes = () => getRandomInteger(LikesCount.MIN, LikesCount.MAX);

const usedAvatarIndex = [];
const getAvatarIndex = () => getUniqueRandomId(AvatarNumber.MIN, AvatarNumber.MAX, usedAvatarIndex);


const getComment = () => {
  const comments = [];
  const numComments = getRandomInteger(0, 30);
  for (let i = 0; i <= numComments - 1; i++) {
    const comment = {
      id: i,
      avatar: `img/avatar-${getRandomInteger(AvatarNumber.MIN, AvatarNumber.MAX)}.svg`,
      message: MESSAGES[getRandomInteger(0, MESSAGES.length-1)],
      name:NAMES[getRandomInteger(0, NAMES.length-1)]
    };
    comments.push(comment);
  }

  return comments;
};

const generatePhotoDescription = () => {
  const id = getId();
  const photo = {
    id: id,
    url: `photos/${id}.jpg`,
    description: 'Посмотрите, какую фотографию я сделал!',
    likes: getLikes(),
    comments: getComment()
  };

  return photo;
};
export const getPhotoDescription = () => Array.from({length:MAX_PHOTOS_COUNT}, generatePhotoDescription);
