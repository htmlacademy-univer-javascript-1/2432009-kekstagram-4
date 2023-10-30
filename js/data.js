import { getUniqueRandomId, getRandomInteger } from './utils';

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


const getComments = () => ({
  id: getId(),
  avatar: `img/avatar-${ getAvatarIndex() }.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length-1)],
  name:NAMES[getRandomInteger(0, NAMES.length-1)]
});

const generatePhotoDescription = () => ({
  id: getId(),
  url: `photos/${ getUrlIndex() }.jpg`,
  description: 'Посмотрите, какую фотографию я сделал!',
  likes: getLikes(),
  comments: Array.from({length:getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, getComments)
});

export const getPhotoDescription = () => Array.from({length:MAX_PHOTOS_COUNT}, generatePhotoDescription);
getPhotoDescription();


