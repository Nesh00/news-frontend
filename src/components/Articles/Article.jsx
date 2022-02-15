import styles from '../../css/Articles&Comments.module.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../utils/api';
import {
  checkMatchingUser,
  formatDate,
} from '../../utils/helperFunctions.util';
import { UserContext } from '../../contexts/User';
import { AddCommentBtn, VoteBtn } from '../Buttons/Buttons';

const Article = ({ article, articleById, setIsOpen }) => {
  const { user } = useContext(UserContext);
  const [eachUser, setEachUser] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [newVote, setNewVote] = useState(1);

  useEffect(() => {
    getUser(article.author).then((userData) => {
      setEachUser(userData);
      setIsLoaded(true);
    });
  }, [article.author]);

  return (
    isLoaded && (
      <>
        <Link
          to={`/articles/${article.article_id}`}
          className={`${styles.articles__link} ${
            articleById && styles['link--disabled']
          }`}
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
        </Link>
        {articleById && <p className={styles.article__body}>{article.body}</p>}
        <div className={styles.votes__container}>
          <p className={styles.votes}>{article.votes} votes</p>
          {checkMatchingUser(user, eachUser) || !user || (
            <VoteBtn
              size={'2x'}
              component={article}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          )}
          {user && articleById ? (
            <AddCommentBtn setIsOpen={setIsOpen} size={'2x'} />
          ) : (
            <p className={styles.comment_count}>
              {article.comment_count} comments
            </p>
          )}
        </div>
      </>
    )
  );
};

export default Article;
