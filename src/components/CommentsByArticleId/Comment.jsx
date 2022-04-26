import styles from '../../css/Articles&Comments.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { deleteComment, getUser } from '../../utils/api';
import {
  formatDate,
  checkMatchingUser,
} from '../../utils/helperFunctions.util';
import { DeleteBtn, EditBtn, VoteBtn } from '../Buttons/Buttons';
import EditCommentForm from './EditCommentForm';

const Comment = ({ comment, comments, setComments, commentKey }) => {
  const { user } = useContext(UserContext);
  const [eachUser, setEachUser] = useState();
  const [newVote, setNewVote] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const deleteCommentHandler = () => {
    deleteComment(comment.comment_id);
    setComments(comments.filter((_, key) => key !== commentKey));
  };

  const openEditFormHandler = () => {
    setIsOpen((currOpen) => !currOpen);
  };

  useEffect(() => {
    getUser(comment.author).then((userData) => setEachUser(userData));
  }, [comment]);

  return (
    <>
      {isOpen && (
        <EditCommentForm
          originalComment={comment}
          setComments={setComments}
          setIsOpen={setIsOpen}
        />
      )}
      <li className={styles.comments__item}>
        {checkMatchingUser(user, eachUser) && (
          <EditBtn
            size={'xl'}
            item={'Comment'}
            openEditFormHandler={openEditFormHandler}
          />
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
          {checkMatchingUser(user, eachUser) || !user || (
            <VoteBtn
              size={'2x'}
              component={comment}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          )}
          {checkMatchingUser(user, eachUser) && (
            <DeleteBtn
              size={'xl'}
              item={'Comment'}
              deleteItem={deleteCommentHandler}
            />
          )}
        </div>
      </li>
    </>
  );
};

export default Comment;
