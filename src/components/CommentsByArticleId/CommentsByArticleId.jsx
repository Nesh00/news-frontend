import { useEffect, useState } from 'react/cjs/react.development';
import { getCommentsByArticleId } from '../../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from '../Articles/Article/Article.module.css';
import formatDate from '../../utils/formatDate.util';

const CommentsByArticleId = ({ article_id }) => {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((commentsData) => {
      setComments(commentsData);
      setIsLoading(false);
    });
  }, [article_id]);

  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} size='6x' spin />
      ) : (
        <ul className={styles.comments}>
          {comments.map((comment) => {
            return (
              <li key={comment.comment_id} className={styles.comments__item}>
                <div className={styles.user__container}>
                  <span className={styles.user_details}>
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      size='2x'
                      className={styles.user__avatar}
                    />
                    {comment.author}
                  </span>
                  <span className={styles.created_at}>
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className={styles.comment__body}>{comment.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CommentsByArticleId;
