import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { getUser } from '../../utils/api';
import {
  formatDate,
  checkMatchingUser,
} from '../../utils/helperFunctions.util';
import { LikeBtn } from '../Buttons/Buttons';

const EachArticle = ({ article }) => {
  const { user } = useContext(UserContext);
  const [eachUser, setEachUser] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUser(article.author).then((userData) => {
      setEachUser(userData);
      setIsLoaded(true);
    });
  }, [article.author]);

  return (
    <li className={styles.article__item} title='View Article'>
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
            {checkMatchingUser(user, eachUser) || !user || (
              <LikeBtn size={'2x'} />
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
