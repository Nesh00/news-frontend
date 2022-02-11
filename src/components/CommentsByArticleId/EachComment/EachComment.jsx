import styles from '../../Articles/Articles.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/User';
import { getUser } from '../../../utils/api';
import {
  formatDate,
  checkMatchingUser,
} from '../../../utils/helperFunctions.util';
import { DeleteBtn, EditBtn, LikeBtn } from '../../Buttons/Buttons';

const EachComment = ({ comment }) => {
  const [eachUser, setEachUser] = useState();
  const { user } = useContext(UserContext);

  useEffect(() => {
    getUser(comment.author).then((userData) => setEachUser(userData));
  }, [comment]);

  return (
    <li className={styles.comments__item}>
      {checkMatchingUser(user, eachUser) && (
        <EditBtn size={'xl'} item={'Comment'} />
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
        {checkMatchingUser(user, eachUser) || !user || <LikeBtn size={'xl'} />}
        {checkMatchingUser(user, eachUser) && (
          <DeleteBtn size={'xl'} item={'Comment'} />
        )}
      </div>
    </li>
  );
};

export default EachComment;
