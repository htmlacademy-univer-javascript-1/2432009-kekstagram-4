const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20);

const isPalindrome = (string) => {
  string = string.replaceAll(' ','').toLowerCase();
  let reverse = '';
  for (let i = string.length-1; i >= 0; i--) {
    reverse += string[i];
  }

  return reverse === string;
};

isPalindrome('Лёша на полке клопа нашёл');

const extractNumbers = (input) => {
  const inputString = input.toString();
  let numbers ='';

  for (const i of inputString) {
    if (i >= '0' && i <= '9') {
      numbers += i;
    }
  }

  return numbers !== '' ? +numbers : NaN;
};
extractNumbers('агент 007');
