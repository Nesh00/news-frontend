import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styles from '../../css/Articles&Comments.module.css';
import { getTopics, postArticle } from '../../utils/api';
import { CloseBtn } from '../Buttons/Buttons';
import Form from '../Form';

const CreateArticle = ({ setIsOpen, setArticles }) => {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [topic, setTopic] = useState('');
  const [article, setArticle] = useState(null);

  const getTitle = (event) => {
    setTitle(event.target.value);
  };

  const getArticle = (event) => {
    setArticleBody(event.target.value);
  };

  const getTopic = (event) => {
    setTopic(event.target.value);
  };

  const createArticleHandler = (event) => {
    event.preventDefault();
    setArticle({
      title,
      topic,
      author: user.username,
      body: articleBody,
      comment_count: 0,
    });
    setTitle('');
    setArticleBody('');
    setTopic('');
    setTimeout(() => {
      setIsOpen(false);
    }, 50);
  };

  const closeNewArticleHandler = () => {
    setIsOpen((currOpen) => !currOpen);
  };

  useEffect(() => {
    getTopics().then((topics) => setTopics(topics));
  }, []);

  useEffect(() => {
    article &&
      postArticle(article).then((newArticle) =>
        setArticles((currArticles) => [newArticle, ...currArticles])
      );
  }, [article]);

  return (
    <Form submitHandler={createArticleHandler}>
      <CloseBtn size={'2x'} closeEvent={closeNewArticleHandler} />
      <p className={styles.newArticle__header}>Create new Article</p>
      <input
        type='text'
        value={title}
        placeholder='Enter Title'
        className={styles.newArticle__input}
        onChange={getTitle}
        required
      />
      <textarea
        value={articleBody}
        placeholder='Enter Article'
        className={styles.comment__area}
        onChange={getArticle}
        required
      ></textarea>
      <div className={styles.newArticle__footer}>
        <select
          className={`${styles.select} ${styles.newArticle__select}`}
          onChange={getTopic}
          value={topic}
          required
        >
          <option hidden>Select Topic</option>
          {topics.map((topic) => {
            return (
              <option key={topic.slug} value={topic.slug}>
                {topic.slug}
              </option>
            );
          })}
        </select>
        <button className={styles.newArticle__btn}>Create</button>
      </div>
    </Form>
  );
};

export default CreateArticle;
