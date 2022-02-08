import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faUserCircle,
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../Articles/Article/Article.module.css';
import formatDate from '../../utils/formatDate.util';
import CommentsByArticleId from '../CommentsByArticleId/CommentsByArticleId';

const ArticleById = () => {
  const [article, setArticle] = useState();
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id).then((articleData) => {
      setArticle(articleData);
      setIsLoading(false);
    });
  }, [article_id]);

  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} size='8x' spin />
      ) : (
        <>
          <div className={styles.article__item}>
            <div className={styles.user__container}>
              <span className={styles.user_details}>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  size='2x'
                  className={styles.user__avatar}
                />
                {article.author}
              </span>
              <span className={styles.created_at}>
                {formatDate(article.created_at)}
              </span>
            </div>
            <h2 className={styles.article__header}>{article.title}</h2>
            <p className={styles.article__body}>{article.body}</p>

            <div className={styles.votes__container}>
              <FontAwesomeIcon icon={faThumbsUp} size='2x' color='#ff9933' />
              <span className={styles.article__vote}>{article.votes}</span>
              <FontAwesomeIcon
                icon={faCommentDots}
                size='2x'
                color='#b9b5b5'
                className={styles.article__comments}
                title='View Comments'
              />
            </div>
          </div>
          <CommentsByArticleId article_id={article_id} />
        </>
      )}
    </>
  );
};

export default ArticleById;
