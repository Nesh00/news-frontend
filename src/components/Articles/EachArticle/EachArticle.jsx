import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getUser } from '../../../utils/api';
import formatDate from '../../../utils/formatDate.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styles from '../Articles.module.css';
import { UserContext } from '../../../contexts/User';

const EachArticle = ({ article }) => {
  const [eachUser, setEachUser] = useState();
  const { user } = useContext(UserContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const checkMatchingUser =
    user && eachUser && user.username === eachUser.username;

  useEffect(() => {
    getUser(article.author).then((userData) => {
      setEachUser(userData);
      setIsLoaded(true);
    });
  }, [article.author]);

  return (
    <li className={styles.article__item}>
      {isLoaded && (
        <Link
          to={`/articles/${article.article_id}`}
          className={styles.articles__link}
        >
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
          <div className={styles.votes__container}>
            <p className={styles.votes}>{article.votes} votes</p>
            {checkMatchingUser ? (
              ''
            ) : (
              <button className={styles.vote}>
                <FontAwesomeIcon icon={faThumbsUp} size='2x' color='#ff9933' />
              </button>
            )}
            <p className={styles.comment_count}>
              {article.comment_count} comments
            </p>
          </div>
        </Link>
      )}
    </li>
  );
};

export default EachArticle;
