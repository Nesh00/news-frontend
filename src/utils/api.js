import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://nenad-nc-news-api.herokuapp.com/api',
});

export const getTopics = () => {
  return baseApi.get(`topics`).then(({ data }) => data.topics);
};
