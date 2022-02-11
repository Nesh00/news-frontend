import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../contexts/User';
import { getArticleById, getUser } from '../../utils/api';
import {
  formatDate,
  checkMatchingUser,
} from '../../utils/helperFunctions.util';
import CommentsByArticleId from '../CommentsByArticleId/CommentsByArticleId';
import AddCommentForm from '../CommentsByArticleId/AddCommentForm';
import Loader from '../Loader/Loader';
import { AddCommentBtn, LikeBtn } from '../Buttons/Buttons';

const ArticleById = () => {
  const { user } = useContext(UserContext);
  const [eachUser, setEachUser] = useState();
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
    });
  }, [article_id]);

  useEffect(() => {
    article &&
      getUser(article.author).then((userData) => {
        setEachUser(userData);
        setIsLoading(false);
      });
  }, [article]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.article__item}>
            <div className={styles.user__container}>
              <p className={styles.user__details}>
                <img
                  src={eachUser.avatar_url}
                  alt={eachUser.name}
                  className={styles.user__avatar}
                />
                {article.author}
              </p>
              <p className={styles.created_at}>
                {formatDate(article.created_at)}
              </p>
            </div>
            <h2 className={styles.article__header}>{article.title}</h2>
            <p className={styles.article__body}>{article.body}</p>
            <div className={styles.votes__container}>
              <p className={styles.votes}>{article.votes} votes</p>
              {checkMatchingUser(user, eachUser) || !user || (
                <LikeBtn size={'2x'} />
              )}
              {user && <AddCommentBtn setIsOpen={setIsOpen} size={'2x'} />}
            </div>
          </div>
          <AddCommentForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            article_id={article_id}
            setComments={setComments}
          />
          <CommentsByArticleId
            article_id={article_id}
            comments={comments}
            setComments={setComments}
          />
        </>
      )}
    </>
  );
};

export default ArticleById;
