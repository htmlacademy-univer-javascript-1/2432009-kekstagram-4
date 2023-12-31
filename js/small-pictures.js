import { openViewPopup } from './view-popup.js';

export const drawMiniatures = (renderedPhotos) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesList = document.querySelector('.pictures');
  const picturesListFragment = document.createDocumentFragment();

  renderedPhotos.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      openViewPopup(url, description, likes, comments);
    });

    picturesListFragment.append(pictureElement);
  });
  picturesList.append(picturesListFragment);
};
