import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/User';
import { postComment } from '../../../utils/api';
import styles from '../../Articles/Articles.module.css';

const AddCommentForm = ({ isOpen, setIsOpen, article_id }) => {
  const [input, setInput] = useState('');
  const [comment, setComment] = useState('');
  const { user } = useContext(UserContext);

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const addCommentHandler = (event) => {
    event.preventDefault();
    setComment(input);
    setInput('');
    setIsOpen(false);
  };

  const closeCommentHandler = () => {
    setIsOpen((currOpen) => !currOpen);
    setInput('');
  };

  useEffect(() => {
    comment.length > 0 && postComment(article_id, user.username, comment);
  }, [comment]);
  console.log(comment);

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <form className={styles.comment__form} onSubmit={addCommentHandler}>
            <FontAwesomeIcon
              icon={faClose}
              className={styles.close__btn}
              size='2x'
              onClick={closeCommentHandler}
            />

            <label className={styles.comment__label}>
              Add Comment
              <textarea
                value={input}
                required
                className={styles.comment__area}
                onChange={getInput}
              ></textarea>
            </label>
            <button className={styles.comment__btn}>Add Comment</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddCommentForm;
