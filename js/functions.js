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
