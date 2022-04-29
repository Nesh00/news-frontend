import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://nenad-nc-news-api.herokuapp.com/api',
});

export const getUser = (username = '') => {
  return baseApi.get(`/users/${username}`).then(({ data }) => data.user);
};

export const createUser = (username, name, avatar_url) => {
  return baseApi.post(`/users`, { username, name, avatar_url });
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

export const postArticle = (newArticle) => {
  return baseApi.post('/articles', newArticle).then(({ data }) => {
    console.log(data);
    return data.article;
  });
};

export const updateArticleVote = (article_id, newVote) => {
  return baseApi.patch(`/articles/${article_id}`, newVote);
};

export const getCommentsByArticleId = (article_id, sort_by, order) => {
  return baseApi
    .get(`/articles/${article_id}/comments`, { params: { sort_by, order } })
    .then(({ data }) => data.comments);
};

export const postComment = (article_id, username, body) => {
  return baseApi
    .post(`/articles/${article_id}/comments`, {
      article_id,
      username,
      body,
    })
    .then(({ data }) => data.comment);
};

export const deleteComment = (comment_id) => {
  return baseApi.delete(`comments/${comment_id}`);
};

export const updateCommentVote = (comment_id, newVote) => {
  return baseApi.patch(`/comments/${comment_id}`, newVote);
};

export const editComment = (comment_id, editedComment) => {
  return baseApi.patch(`/comments/${comment_id}`, editedComment);
};

// export const patchArticleById = (article_id, data) => {
//   return baseApi
//     .patch(`/articles/${article_id}`, data)
//     .then(({ data }) => data.article);
// };
