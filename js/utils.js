const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getUniqueRandomId = (min,max,array) => {
  const getRandomId = createRandomIdFromRangeGenerator(min, max);
  let randomId = getRandomId();
  while (array.includes(randomId)) {
    randomId = getRandomId();
  }
  array.push(randomId);

  return randomId;
};

export {getRandomInteger,getUniqueRandomId};
