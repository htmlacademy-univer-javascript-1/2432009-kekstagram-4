const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const inputEffectNone = document.querySelector('#effect-none');
const inputEffectChrome = document.querySelector('#effect-chrome');
const inputEffectSepia = document.querySelector('#effect-sepia');
const inputEffectMarvin = document.querySelector('#effect-marvin');
const inputEffectPhobos = document.querySelector('#effect-phobos');
const inputEffectHeat = document.querySelector('#effect-heat');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const inputScale = document.querySelector('.scale__control--value');
const sliderBackground = document.querySelector('.img-upload__effect-level');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


sliderElement.noUiSlider.on('update', () => {
  valueElement.setAttribute('value', sliderElement.noUiSlider.get());
});

document.querySelectorAll('.effects__radio').forEach((element) => {
  element.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      imgUploadPreview.className = `effects__preview--${element.value}`;
    }
  });
});

const updateForChromeSepia = () => {
  sliderElement.removeAttribute('disabled');
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  });
};

const updateForMarvin = () => {
  sliderElement.removeAttribute('disabled');
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1
  });
};

const updateForFobos = () => {
  sliderElement.removeAttribute('disabled');
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  });
};

const updateForHeat = () => {
  sliderElement.removeAttribute('disabled');
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  });
};

inputEffectHeat.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForHeat();
    sliderElement.noUiSlider.on('update', () => {
      imgUploadPreview.setAttribute('style', `filter: brightness(${valueElement.value}); transform: scale(${inputScale.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});
inputEffectPhobos.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForFobos();
    sliderElement.noUiSlider.on('update', () => {
      imgUploadPreview.setAttribute('style', `filter: blur(${valueElement.value}px); transform: scale(${inputScale.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});
inputEffectMarvin.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForMarvin();
    sliderElement.noUiSlider.on('update', () => {
      imgUploadPreview.setAttribute('style', `filter: invert(${valueElement.value}%); transform: scale(${inputScale.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});
inputEffectSepia.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForChromeSepia();
    sliderElement.noUiSlider.on('update', () => {
      imgUploadPreview.setAttribute('style', `filter: sepia(${valueElement.value}); transform: scale(${inputScale.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});
inputEffectChrome.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    updateForChromeSepia();
    sliderElement.noUiSlider.on('update', () => {
      imgUploadPreview.setAttribute('style', `filter: grayscale(${valueElement.value}); transform: scale(${inputScale.value})`);
      valueElement.setAttribute('value', sliderElement.noUiSlider.get());
      sliderBackground.classList.remove('hidden');
    });
  }
});
inputEffectNone.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imgUploadPreview.setAttribute('style', `transform: scale(${inputScale.value})`);
    sliderElement.setAttribute('disabled', true);
    sliderElement.classList.add('hidden');
    sliderBackground.classList.add('hidden');
  }
});
export {sliderBackground};
