const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');

export const openViewPopup = (evt, url, description, likes, comments) =>{
  const openedPicture = document.querySelector('.big-picture');
  commentsLoader.classList.remove('hidden');
  openedPicture.classList.remove('hidden');
  openedPicture.querySelector('.big-picture__img img').src = url;
  openedPicture.querySelector('.likes-count').textContent = likes;
  openedPicture.querySelector('.comments-count').textContent = comments.length;
  openedPicture.querySelector('.social__caption').textContent = description;

  const commentsFragment = document.createDocumentFragment();

  for (let i = 0; i < comments.length; i++){
    document.querySelector('.active__comments-count').textContent = comments.length;
    commentsLoader.classList.add('hidden');
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = comments[i].avatar;
    comment.querySelector('.social__picture').alt = comments[i].name;
    comment.querySelector('.social__text').textContent = comments[i].message;
    commentsFragment.append(comment);
  }

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);

  document.body.classList.add('modal-open');

  openedPicture.querySelector('.big-picture__cancel').addEventListener('click', closeViewPopup);
  document.addEventListener('keydown', onCloseBtnClick);
};

const closeViewPopup = (evt) =>{
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  evt.target.removeEventListener('click', closeViewPopup);
  document.removeEventListener('keydown', onCloseBtnClick);
};

const onCloseBtnClick = (evt) => {
  if (evt.key === 'Escape') {
    closeViewPopup(evt);
  }
};
