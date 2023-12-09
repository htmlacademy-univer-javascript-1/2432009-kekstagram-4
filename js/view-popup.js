const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const closeViewPopupBtn = document.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeViewPopup();
  }
};

const showNextComments = () => {
  let currentComment = document.querySelector('.social__comment.hidden');
  let i = 0;

  for (; i < 5; i++) {
    if (currentComment === null) {
      commentsLoader.classList.add('hidden');
      break;
    }
    currentComment.classList.remove('hidden');
    currentComment = currentComment.nextElementSibling;
    if (currentComment === null) {
      commentsLoader.classList.add('hidden');
      document.querySelector('.active__comments-count').textContent = +document.querySelector('.active__comments-count').textContent + 1;
      break;
    }
  }
  document.querySelector('.active__comments-count').textContent = +document.querySelector('.active__comments-count').textContent + i;
};


const onCloseBtnClick = () => closeViewPopup();

function closeViewPopup() {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeViewPopupBtn.removeEventListener('click', onCloseBtnClick);
  document.querySelector('.social__comments-loader').removeEventListener('click', showNextComments);
}

export const openViewPopup = (url, description, likes, comments) =>{
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  document.querySelector('.active__comments-count').textContent = '0';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach((element) => {
    commentsLoader.classList.add('hidden');
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = element.avatar;
    comment.querySelector('.social__picture').alt = element.name;
    comment.querySelector('.social__text').textContent = element.message;
    comment.classList.add('hidden');
    commentsFragment.append(comment);
  });

  const commentsContainer = document.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  commentsContainer.append(commentsFragment);
  commentsLoader.classList.remove('hidden');
  showNextComments();

  document.body.classList.add('modal-open');

  closeViewPopupBtn.addEventListener('click', onCloseBtnClick);

  bigPicture.querySelector('.social__comments-loader').addEventListener('click', showNextComments);
};
