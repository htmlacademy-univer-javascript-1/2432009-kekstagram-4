const bodyElement = document.querySelector('body');
const overlayElement=bodyElement.querySelector('.img-upload__overlay');
const inputUploadElement = bodyElement.querySelector('.img-upload__input');
const closeEditPopupBtn = bodyElement.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const uploadElement = document.getElementById('upload-file');
const inputHashtags = document.querySelector('.text__hashtags');
const uploadComment = document.querySelector('.text__description');
const REG_HASHTAGS = /^#[a-zа-яё0-9]{0,19}$/i;
const acceptedFiles = ['image/jpeg','image/png', 'image/jpg'];


const initValidation = () => {
  const pristine = new Pristine(
    form,
    {
      classTo: 'img-upload__field-wrapper',
      errorClass: 'img-upload__field-wrapper--invalid',
      successClass: 'img-upload__field-wrapper--valid',
      errorTextParent: 'img-upload__field-wrapper',
      errorTextTag: 'span',
      errorTextClass: 'form__error'
    },
    true);

  const validateComment = (value) => value.length <= 140;

  const normalizeHashtags = (value) => {
    const hashtags = value.split(' ');
    return hashtags.filter((element) => element !== '');
  };

  const isUniqueElements = (value) => {
    const lowercasedHashtags = value.map((element) => element.toLowerCase());
    return value.length === new Set(lowercasedHashtags).size;
  };

  const isHashtagValid = (value) => REG_HASHTAGS.test(value);

  const validateSameHashtags = (value) => isUniqueElements(normalizeHashtags(value));

  const validateHandlerHashtag = (value) => {
    if (value === '') {
      return true;
    } else {
      return normalizeHashtags(value).every((element) => isHashtagValid(element));
    }
  };

  const validateHashtagsCount = (value) => {
    const hashtagsArray = value.split('#');
    return hashtagsArray.length <= 6;
  };

  pristine.addValidator(
    inputHashtags,
    validateHashtagsCount,
    'Превышено количество хэш-тегов'
  );

  pristine.addValidator(
    inputHashtags,
    validateSameHashtags,
    'Хэш-теги не должны повторяться'
  );

  pristine.addValidator(
    inputHashtags,
    validateHandlerHashtag,
    'Хэш-тег должен начинаться с # и может состоять только из букв и чисел, максимальная длина одного хэш-тега 20 символов, включая #; хэш-теги разделяются пробелом'
  );

  pristine.addValidator(
    uploadComment,
    validateComment,
    'Длина комментария до 140 символов'
  );

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();

    if (pristine.validate()) {
      evt.target.submit();
    }
  });
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditPopup();
  }
};

const onCloseBtnClick = () => closeEditPopup();

function closeEditPopup () {
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  window.removeEventListener('keydown',onDocumentKeydown);
  closeEditPopupBtn.removeEventListener('click', onCloseBtnClick);
  uploadElement.value = '';
}

const openEditPopup =() => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  window.addEventListener('keydown',onDocumentKeydown);
  closeEditPopupBtn.addEventListener('click', onCloseBtnClick);
};

const onInputUploadElementChange = () => {
  if (acceptedFiles.includes(uploadElement.files[0].type)) {
    openEditPopup();
    initValidation();
  }
};

export const initEditPopup = () => {
  inputUploadElement.addEventListener('change',onInputUploadElementChange);
};
