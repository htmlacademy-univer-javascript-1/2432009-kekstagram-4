const checkStringLength = (string, maxLength) => {
  if (string.length <= maxLength){
    return true;
  }
  return false;
};

const isPalindrome = (string) => {
  string = string.toLowerCase();
  string = string.replaceAll(' ','');
  let newString ='';
  let i = -1;
  while (newString.length < string.length) {
    newString = newString + string.at(i);
    i -= 1;
  }
  if (newString === string){
    return true;
  }
  return false;
};

const extractTheNumbers = (string) => {
  let numbers ='';
  for (let i = 0; i < string.length; i++) {
    if (parseInt(string[i]) || string[i] == 0) {
      numbers = numbers + string[i];
    }
  }
  numbers = numbers.replaceAll(' ','');
  numbers = parseInt(numbers);
  return numbers;
}
