import {closeEditPopup} from './edit-popup.js';
import {isEscKey} from './utils.js';
const bodyElement = document.body;
const successMessageTemplate = document.querySelector('#success').content.querySelector('section');
const errorMessageTemplate = bodyElement.querySelector('#error').content.querySelector('section');

const onFormClick = (evt) => {
  const clickElem = evt.target;
  if(clickElem.classList.contains('success__inner') || clickElem.classList.contains('error__inner')){
    return;
  }
  closeMessage();
};

const onFormKeyDown = (evt) => {
  evt.preventDefault();
  if(isEscKey(evt)){
    closeMessage();
  }
};

function closeMessage () {
  bodyElement.removeEventListener('click', onFormClick);
  document.removeEventListener('keydown', onFormKeyDown);
  bodyElement.removeChild(bodyElement.lastChild);
}

const showMessage = (messageTemplate) => {
  const message = messageTemplate.cloneNode(1);
  message.style.zIndex = 100;
  document.addEventListener('keydown', onFormKeyDown);
  bodyElement.addEventListener('click', onFormClick);
  bodyElement.appendChild(message);
};

const onSuccess = () => {
  closeEditPopup();
  showMessage(successMessageTemplate);
};

const onFail = () => {
  showMessage(errorMessageTemplate);
};

export{onSuccess, onFail};
