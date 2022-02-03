export const formatTime = string => {
  // string: "yyyy-mm-dd hh:mm:ss"
  const time = string.split(' ')[1];
  const timeList = time.split(':');

  return timeList[0].concat(':', timeList[1]);
};

export const formatNumber = value => {
  return ('00' + value).slice(-2);
};
