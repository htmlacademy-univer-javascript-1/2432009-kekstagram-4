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

const timeToMinutes = (time) =>
{
  const timeParts = time.split(':');
  const hours = parseInt(timeParts[0],10);
  const minutes = parseInt(timeParts[1],10);

  return hours * 60 + minutes;
};

const isMeetingWithinWorkingDay = (startWorkingTime, endWorkingTime, startMeetingTime, meetingDuration) =>
{
  startWorkingTime = timeToMinutes(startWorkingTime);
  endWorkingTime = timeToMinutes(endWorkingTime);
  startMeetingTime = timeToMinutes(startMeetingTime);
  const meetingEndTime = startMeetingTime + meetingDuration;

  return (startMeetingTime >= startWorkingTime && meetingEndTime <= endWorkingTime);
};

isMeetingWithinWorkingDay('8:00', '17:30', '08:00', 900);
