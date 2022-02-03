export const formatTime = string => {
  // string: "yyyy-mm-dd hh:mm:ss"
  console.log(string);
  const time = string.split(' ')[1];
  const timeList = time.split(':');

  return timeList[0].concat(':', timeList[1]);
};
