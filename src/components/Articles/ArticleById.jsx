import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../../utils/api';
import CommentsByArticleId from '../CommentsByArticleId/CommentsByArticleId';
import AddCommentForm from '../CommentsByArticleId/AddCommentForm';
import Loader from '../Loader/Loader';
import Article from './Article';
import Error from '../Errors/Error';

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleData) => {
        setArticle(articleData);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response) setError(err.response);
      });
  }, [article_id]);

  return error ? (
    <Error error={error} />
  ) : isLoading ? (
    <Loader />
  ) : (
    <>
      <main className={styles.article__item}>
        <Article article={article} articleById={true} setIsOpen={setIsOpen} />
      </main>
      <AddCommentForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        article_id={article_id}
        setComments={setComments}
      />
      <CommentsByArticleId
        article_id={article_id}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
};

export default ArticleById;
