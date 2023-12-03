const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const closeViewPopupBtn = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeViewPopup();
  }
};

const onCloseBtnClick = () => closeViewPopup();

function closeViewPopup() {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeViewPopupBtn.removeEventListener('click', onCloseBtnClick);
}

export const openViewPopup = (url, description, likes, comments) =>{
  const bigPicture = document.querySelector('.big-picture');
  commentsLoader.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((element) => {
    document.querySelector('.active__comments-count').textContent = comments.length;
    commentsLoader.classList.add('hidden');
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    commentsFragment.append(comment);
  });

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);

  document.body.classList.add('modal-open');

  closeViewPopupBtn.addEventListener('click', onCloseBtnClick);
};
