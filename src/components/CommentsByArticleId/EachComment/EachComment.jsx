import { useContext, useEffect, useState } from 'react';
import { getUser } from '../../../utils/api';
import formatDate from '../../../utils/formatDate.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faTrashCan,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../Articles/Articles.module.css';
import { UserContext } from '../../../contexts/User';

const EachComment = ({ comment }) => {
  const [eachUser, setEachUser] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getUser(comment.author).then((userData) => setEachUser(userData));
  }, [comment]);

  const checkMatchingUser =
    user && eachUser && user.username === eachUser.username;

  return (
    <li className={styles.comments__item}>
      {checkMatchingUser ? (
        <button className={styles.edit__comment}>
          <FontAwesomeIcon icon={faEllipsis} size='xl' color='#ada9a9' />
        </button>
      ) : (
        ''
      )}
      <div className={styles.user__container}>
        <p className={styles.user__details}>
          {eachUser && (
            <img
              src={eachUser.avatar_url}
              alt={eachUser.name}
              className={styles.user__avatar}
            />
          )}
          {comment.author}
        </p>
        <p className={styles.created_at}>{formatDate(comment.created_at)}</p>
      </div>
      <p className={styles.comment__body}>{comment.body}</p>
      <div className={styles.votes__container}>
        <p className={styles.votes}>{comment.votes} votes</p>
        {checkMatchingUser || !user ? (
          ''
        ) : (
          <button className={styles.vote}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size='xl'
              color='#ff9933'
              title='Edit Comment'
            />
          </button>
        )}
        {checkMatchingUser ? (
          <button className={styles.delete__comment}>
            <FontAwesomeIcon
              icon={faTrashCan}
              size='xl'
              color='#ada9a9'
              title='Delete Comment'
              className={styles.vote}
            />
          </button>
        ) : (
          ''
        )}
      </div>
    </li>
  );
};

export default EachComment;
