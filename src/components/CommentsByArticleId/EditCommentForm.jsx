import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect } from 'react';
import { CloseBtn } from '../Buttons/Buttons';
import Form from '../Form';
import { editComment } from '../../utils/api';

const EditCommentForm = ({ originalComment, setComments, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [editedComment, setEditedComment] = useState('');

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const editCommentHandler = (event) => {
    event.preventDefault();
    setEditedComment(input);
    setInput('');
  };

  const closeEditCommentHandler = () => {
    setIsOpen((currOpen) => !currOpen);
    setInput('');
  };

  useEffect(() => {
    editedComment && setIsOpen((currOpen) => !currOpen);
    editedComment &&
      editComment(originalComment.comment_id, { body: editedComment }).then(
        ({ data }) => {
          setComments((currComments) =>
            currComments.map((comment) =>
              comment.comment_id === data.comment.comment_id
                ? data.comment
                : comment
            )
          );
        }
      );

    return () => {
      setEditedComment('');
    };
  }, [editedComment]);

  return (
    <Form submitHandler={editCommentHandler}>
      <CloseBtn size={'2x'} closeEvent={closeEditCommentHandler} />
      <label className={styles.comment__label}>
        Edit Comment
        <textarea
          value={input}
          required
          className={styles.comment__area}
          onChange={getInput}
        ></textarea>
      </label>
      <button className={styles.comment__btn}>Edit</button>
    </Form>
  );
};

export default EditCommentForm;
