import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getUser } from '../../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import styles from '../Articles.module.css';
import formatDate from '../../../utils/formatDate.util';
import CommentsByArticleId from '../../CommentsByArticleId/CommentsByArticleId';
import Loader from '../../Loader/Loader';
import { UserContext } from '../../../contexts/User';

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [eachUser, setEachUser] = useState();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
    });
  }, [article_id]);

  useEffect(() => {
    article &&
      getUser(article.author).then((userData) => {
        setEachUser(userData);
        setIsLoading(false);
      });
  }, [article]);

  const checkMatchingUser =
    user && eachUser && user.username === eachUser.username;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.article__item}>
            <div className={styles.user__container}>
              <p className={styles.user__details}>
                <img
                  src={eachUser.avatar_url}
                  alt={eachUser.name}
                  className={styles.user__avatar}
                />
                {article.author}
              </p>
              <p className={styles.created_at}>
                {formatDate(article.created_at)}
              </p>
            </div>
            <h2 className={styles.article__header}>{article.title}</h2>
            <p className={styles.article__body}>{article.body}</p>
            <div className={styles.votes__container}>
              <p className={styles.votes}>{article.votes} votes</p>
              {checkMatchingUser ? (
                ''
              ) : (
                <button className={styles.vote}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    size='2x'
                    color='#ff9933'
                  />
                </button>
              )}
              <FontAwesomeIcon
                icon={faCommentDots}
                size='2x'
                color='#ada9a9'
                className={styles.add__comment}
                title='View Comments'
              />
            </div>
          </div>
          <CommentsByArticleId article_id={article_id} />
        </>
      )}
    </>
  );
};

export default ArticleById;
