import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://nenad-nc-news-api.herokuapp.com/api',
});

export const getUser = (username = '') => {
  return baseApi.get(`/users/${username}`).then(({ data }) => data.user);
};

export const getTopics = () => {
  return baseApi.get(`/topics`).then(({ data }) => data.topics);
};

export const getArticles = (topic, sort_by, order) => {
  return baseApi
    .get(`/articles`, { params: { topic, sort_by, order } })
    .then(({ data }) => data.articles);
};

export const getArticleById = (article_id) => {
  return baseApi
    .get(`/articles/${article_id}`)
    .then(({ data }) => data.article);
};

// export const patchArticleById = (article_id, data) => {
//   return baseApi
//     .patch(`/articles/${article_id}`, data)
//     .then(({ data }) => data.article);
// };

export const getCommentsByArticleId = (article_id, sort_by, order) => {
  return baseApi
    .get(`/articles/${article_id}/comments`, { params: { sort_by, order } })
    .then(({ data }) => data.comments);
};
