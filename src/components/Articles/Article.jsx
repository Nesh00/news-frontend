import styles from '../../css/Articles&Comments.module.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../utils/api';
import {
  checkMatchingUser,
  formatDate,
} from '../../utils/helperFunctions.util';
import { UserContext } from '../../contexts/UserContext';
import { AddCommentBtn, EditBtn, VoteBtn } from '../Buttons/Buttons';
import EditArticleForm from './EditArticleForm';

const Article = ({ article, articleById, setIsOpen }) => {
  const { user } = useContext(UserContext);
  const [newArticle, setNewArticle] = useState(article);
  const [eachUser, setEachUser] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [newVote, setNewVote] = useState(1);
  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    getUser(article.author).then((userData) => {
      setEachUser(userData);
      setIsLoaded(true);
    });
  }, [article.author]);

  const openEditFormHandler = () => {
    setOpenEditForm((currState) => !currState);
  };

  return (
    isLoaded && (
      <>
        <Link
          to={`/articles/${article.article_id}`}
          className={`${styles.articles__link} ${
            articleById && styles['link--disabled']
          }`}
        >
          {user && articleById && checkMatchingUser(user, eachUser) && (
            <EditBtn
              style={styles['edit__article--btn']}
              size={'2x'}
              item={'article'}
              openEditFormHandler={openEditFormHandler}
            />
          )}
          <div className={styles.user__container}>
            <p className={styles.user__details}>
              <img
                src={eachUser.avatar_url}
                alt={eachUser.name}
                className={styles.user__avatar}
              />
              {newArticle.author}
            </p>
            <p className={styles.created_at}>
              {formatDate(newArticle.created_at)}
            </p>
          </div>
          <h2 className={styles.article__header}>{newArticle.title}</h2>
        </Link>
        {articleById && (
          <p className={styles.article__body}>{newArticle.body}</p>
        )}
        <div className={styles.votes__container}>
          <p className={styles.votes}>{newArticle.votes} votes</p>
          {checkMatchingUser(user, eachUser) || !user || (
            <VoteBtn
              size={'2x'}
              component={newArticle}
              newVote={newVote}
              setNewVote={setNewVote}
            />
          )}
          {user && articleById ? (
            <AddCommentBtn setIsOpen={setIsOpen} size={'2x'} />
          ) : (
            <p className={styles.comment_count}>
              {newArticle.comment_count} comments
            </p>
          )}
        </div>
        {openEditForm && (
          <EditArticleForm
            setOpenEditForm={setOpenEditForm}
            newArticle={newArticle}
            setNewArticle={setNewArticle}
          />
        )}
      </>
    )
  );
};

export default Article;
