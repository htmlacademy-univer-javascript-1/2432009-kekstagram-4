const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const closeViewPopupBtn = document.querySelector('.big-picture__cancel');
const activeComments = document.querySelector('.active__comments-count');
const COMMENT_STEP = 5;

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeViewPopup();
  }
};

const onLoadBtnClick = () => {
  let currentComment = document.querySelector('.social__comment.hidden');
  let i = 0;
  for (let j = i; i < j + COMMENT_STEP; i++) {
    if (!currentComment) {
      commentsLoader.classList.add('hidden');
      break;
    }
    currentComment.classList.remove('hidden');
    currentComment = currentComment.nextElementSibling;
    if (!currentComment) {
      commentsLoader.classList.add('hidden');
      activeComments.textContent = +activeComments.textContent + 1;
      break;
    }
  }
  activeComments.textContent = +activeComments.textContent + i;
};


const onCloseBtnClick = () => closeViewPopup();

function closeViewPopup() {
  document.body.classList.remove('modal-open');
  document.querySelector('.big-picture').classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeViewPopupBtn.removeEventListener('click', onCloseBtnClick);
  document.querySelector('.social__comments-loader').removeEventListener('click', onLoadBtnClick);
}

export const openViewPopup = (url, description, likes, comments) =>{
  const bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  activeComments.textContent = '0';
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
  onLoadBtnClick();

  document.body.classList.add('modal-open');

  closeViewPopupBtn.addEventListener('click', onCloseBtnClick);

  bigPicture.querySelector('.social__comments-loader').addEventListener('click', onLoadBtnClick);
};
