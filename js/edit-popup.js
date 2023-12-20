import {initScaleEffect, destroyScaleEffect} from'./effect-scale-photo.js';
import {sliderBackground} from './effect-slider.js';
import {onSuccess, onFail} from './form-submit.js';
import { uploadData } from './api.js';

const SCALE_VALUE = 100;
const PERCENT = '%';
const SCALE_MAX = 1;
const HASHTAGS_REGEXP = /^#[a-zа-яё0-9]{0,19}$/i;

const bodyElement = document.querySelector('body');
const overlayElement=bodyElement.querySelector('.img-upload__overlay');
const inputUploadElement = bodyElement.querySelector('.img-upload__input');
const closeEditPopupBtn = bodyElement.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview img');
const uploadElement = document.getElementById('upload-file');
const inputHashtags = document.querySelector('.text__hashtags');
const uploadComment = document.querySelector('.text__description');
const acceptedFiles = ['image/jpeg','image/png', 'image/jpg'];
const scaleControl = document.querySelector('.scale__control--value');
const effects = document.querySelectorAll('.effects__preview');

const onFormUploadSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  uploadData(onSuccess, onFail, 'POST', formData);
};

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

  const isHashtagValid = (value) => HASHTAGS_REGEXP.test(value);

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
  form.removeEventListener('submit', onFormUploadSubmit);
  uploadElement.value = '';
  imgPreview.style.transform = `scale(${SCALE_MAX})`;
  imgPreview.style.filter = '';
  imgPreview.className = 'effects__preview--none';
  imgPreview.dataset.filterName = '';
  destroyScaleEffect();
  form.reset();
}

const openEditPopup =() => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  window.addEventListener('keydown',onDocumentKeydown);
  closeEditPopupBtn.addEventListener('click', onCloseBtnClick);
  form.addEventListener('submit', onFormUploadSubmit);
  scaleControl.value = SCALE_VALUE + PERCENT;
  initScaleEffect();
  sliderBackground.classList.add('hidden');
};

const changeImages = () => {
  const file = uploadElement.files[0];
  const fileUrl = URL.createObjectURL(file);

  imgPreview.src = fileUrl;

  effects.forEach((effect) => {
    effect.style.backgroundImage = `url('${fileUrl}')`;
  });
};

const onInputUploadElementChange = () => {
  if (acceptedFiles.includes(uploadElement.files[0].type)) {
    openEditPopup();
    initValidation();
    changeImages();
  }
};

const initEditPopup = () => {
  inputUploadElement.addEventListener('change',onInputUploadElementChange);
};

export {closeEditPopup,initEditPopup};

