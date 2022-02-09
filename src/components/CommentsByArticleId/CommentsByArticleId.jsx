import { useEffect, useState } from 'react';
import { getCommentsByArticleId } from '../../utils/api';
import styles from '../Articles/Article/Article.module.css';
import EachComment from './EachComment/EachComment';
import Loader from '../Loader/Loader';

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
        <Loader />
      ) : (
        <ul className={styles.comments}>
          {comments.map((comment) => {
            return <EachComment comment={comment} />;
          })}
        </ul>
      )}
    </>
  );
};

export default CommentsByArticleId;
