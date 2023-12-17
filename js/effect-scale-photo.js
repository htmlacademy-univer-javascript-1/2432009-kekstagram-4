const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const inputScale = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const btnBigger = document.querySelector('.scale__control--bigger');
const btnSmaller = document.querySelector('.scale__control--smaller');

const checkBtnAccess = (numberScaleValue) => {
  if (numberScaleValue === SCALE_MAX) {
    btnBigger.disabled = true;
    btnSmaller.disabled = false;
  } else if (numberScaleValue === SCALE_MIN) {
    btnSmaller.disabled = true;
    btnBigger.disabled = false;
  } else {
    btnSmaller.disabled = false;
    btnBigger.disabled = false;
  }
};

const changeScale = (number) => {
  imgUploadPreview.style.transform = `scale(${number/SCALE_MAX})`;
};

const initScaleEffect = () => {
  btnBigger.addEventListener('click', () => {
    let numberScaleValue = parseInt(inputScale.value.match(/\d+/), 10);
    numberScaleValue += SCALE_STEP;
    inputScale.value =  `${numberScaleValue}%`;

    checkBtnAccess(numberScaleValue);
    changeScale(numberScaleValue);
  });

  btnSmaller.addEventListener('click', () => {
    let numberScaleValue = parseInt(inputScale.value.match(/\d+/), 10);
    numberScaleValue -= SCALE_STEP;
    inputScale.value =  `${numberScaleValue}%`;

    checkBtnAccess(numberScaleValue);
    changeScale(numberScaleValue);
  });
};

const destroyScaleEffect = () => {
  btnBigger.removeEventListener('click', () => {
    let numberScaleValue = parseInt(inputScale.value.match(/\d+/), 10);
    numberScaleValue += SCALE_STEP;
    inputScale.value =  `${numberScaleValue}%`;

    checkBtnAccess(numberScaleValue);
    changeScale(numberScaleValue);
  });

  btnSmaller.removeEventListener('click', () => {
    let numberScaleValue = parseInt(inputScale.value.match(/\d+/), 10);
    numberScaleValue -= SCALE_STEP;
    inputScale.value =  `${numberScaleValue}%`;

    checkBtnAccess(numberScaleValue);
    changeScale(numberScaleValue);
  });
};


export {initScaleEffect, destroyScaleEffect};
