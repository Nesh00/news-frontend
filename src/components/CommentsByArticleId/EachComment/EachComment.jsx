import { useEffect, useState } from 'react';
import { getUser } from '../../../utils/api';
import formatDate from '../../../utils/formatDate.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styles from '../../Articles/Article/Article.module.css';

const EachComment = ({ comment }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(comment.author).then((userData) => setUser(userData));
  }, [comment]);
  console.log(comment);

  return (
    <li key={comment.comment_id} className={styles.comments__item}>
      <div className={styles.user__container}>
        <p className={styles.user__details}>
          {user && (
            <img
              src={user.avatar_url}
              alt={user.name}
              className={styles.user__avatar}
            />
          )}
          {comment.author}
        </p>
        <p className={styles.created_at}>{formatDate(comment.created_at)}</p>
      </div>
      <p className={styles.comment__body}>{comment.body}</p>
      <div className={styles.votes__container}>
        <FontAwesomeIcon
          icon={faThumbsUp}
          size='2x'
          color='#ff9933'
          className={styles.vote}
        />
        <p className={styles.votes}>{comment.votes} votes</p>
      </div>
    </li>
  );
};

export default EachComment;
