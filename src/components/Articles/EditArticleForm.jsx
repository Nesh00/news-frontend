import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect } from 'react';
import { CloseBtn } from '../Buttons/Buttons';
import Form from '../Form';
import { editArticle } from '../../utils/api';

const EditArticleForm = ({ setOpenEditForm, newArticle, setNewArticle }) => {
  const [title, setTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [editedArticle, setEditedArticle] = useState(null);

  const getTitle = (event) => {
    setTitle(event.target.value);
  };

  const getArticle = (event) => {
    setArticleBody(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setEditedArticle(() => {
      return { title, topic: newArticle.topic, body: articleBody };
    });
    setTitle('');
    setArticleBody('');
  };

  useEffect(() => {
    editedArticle && setOpenEditForm((currState) => !currState);
    editedArticle &&
      editArticle(newArticle.article_id, editedArticle).then((result) => {
        setNewArticle(result);
      });

    return () => {
      setEditedArticle(null);
    };
  }, [editedArticle]);

  const closeFormHandler = () => {
    setOpenEditForm((currState) => !currState);
  };

  return (
    <Form submitHandler={submitHandler}>
      <CloseBtn size={'2x'} closeEvent={closeFormHandler} />
      <p className={styles['edit__article--header']}>Edit Article</p>
      <input
        type='text'
        value={title}
        placeholder='Edit Title'
        className={styles.newArticle__input}
        onChange={getTitle}
      />
      <label className={styles.comment__label}>
        <textarea
          type='text'
          value={articleBody}
          placeholder='Edit Article Body'
          className={styles.comment__area}
          onChange={getArticle}
        />
      </label>
      <button className={styles.comment__btn}>Edit</button>
    </Form>
  );
};

export default EditArticleForm;
