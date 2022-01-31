import axios from 'axios';

const API_END_POINT = 'https://frontend.tabling.co.kr';

export const request = async url => {
  return await axios
    .get(`${API_END_POINT}${url}`)
    .then(response => response.data)
    .catch(error => alert(error.response));
};
