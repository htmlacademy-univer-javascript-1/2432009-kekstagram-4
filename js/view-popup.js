const COMMENT_STEP = 5;
const commentTemplate = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.comments-loader');
const closeViewPopupBtn = document.querySelector('.big-picture__cancel');
const activeComments = document.querySelector('.active__comments-count');
const bigPicture = document.querySelector('.big-picture');
const loadCommentsBtn = bigPicture.querySelector('.social__comments-loader');

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeViewPopup();
  }
};

const renderMoreComments = () => {
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

const onLoadCommentsBtn = () => renderMoreComments();
const onCloseBtnClick = () => closeViewPopup();

function closeViewPopup() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeViewPopupBtn.removeEventListener('click', onCloseBtnClick);
  loadCommentsBtn.removeEventListener('click', onLoadCommentsBtn);
}

export const openViewPopup = (url, description, likes, comments) =>{
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
  renderMoreComments();

  document.body.classList.add('modal-open');
  closeViewPopupBtn.addEventListener('click', onCloseBtnClick);
  loadCommentsBtn.addEventListener('click', onLoadCommentsBtn);
};
