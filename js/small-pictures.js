import {generatePhotoDescription} from './data.js';

export const drawMiniatures = () => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesList = document.querySelector('.pictures');
  const picturesListFragment = document.createDocumentFragment();
  const renderPhotoPreview = generatePhotoDescription();

  renderPhotoPreview.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesListFragment.append(pictureElement);
  });
  picturesList.append(picturesListFragment);
};
