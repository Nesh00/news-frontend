import styles from '../../css/Articles&Comments.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { postComment } from '../../utils/api';
import { formatDate } from '../../utils/helperFunctions.util';
import { CloseBtn } from '../Buttons/Buttons';
import Form from '../Form';

const AddCommentForm = ({ isOpen, setIsOpen, article_id, setComments }) => {
  const [input, setInput] = useState('');
  const [addComment, setAddComment] = useState('');
  const { user } = useContext(UserContext);
  const date = new Date();
  const timestamp = date.getTime();

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const addCommentHandler = (event) => {
    event.preventDefault();
    setAddComment(input);
    setInput('');
    setIsOpen(false);
  };

  const closeCommentHandler = () => {
    setIsOpen((currOpen) => !currOpen);
    setInput('');
  };

  useEffect(() => {
    const fakePost = {
      author: user && user.username,
      body: addComment,
      created_at: formatDate(timestamp),
    };

    addComment && setComments((currComments) => [fakePost, ...currComments]);
    addComment && postComment(article_id, user.username, addComment);
  }, [addComment]);

  return (
    isOpen && (
      <Form submitHandler={addCommentHandler}>
        <CloseBtn size={'2x'} closeEvent={closeCommentHandler} />
        <label className={styles.comment__label}>
          Add Comment
          <textarea
            value={input}
            required
            className={styles.comment__area}
            onChange={getInput}
          ></textarea>
        </label>
        <button className={styles.comment__btn}>add</button>
      </Form>
    )
  );
};

export default AddCommentForm;
