import { useEffect, useState } from 'react';
import { getCommentsByArticleId } from '../../utils/api';
import styles from '../Articles/Articles.module.css';
import EachComment from './EachComment/EachComment';
import Loader from '../Loader/Loader';

const CommentsByArticleId = ({ article_id }) => {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState();

  const sortByHandler = (event) => {
    setSortBy(event.target.value);
  };
  const orderHandler = (event) => {
    setOrder(event.target.value);
  };

  useEffect(() => {
    getCommentsByArticleId(article_id, sortBy, order).then((commentsData) => {
      setComments(commentsData);
      setIsLoading(false);
    });
  }, [article_id, sortBy, order]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.select__container}>
            <select className={styles.select} onChange={sortByHandler}>
              <option>created_at</option>
              <option>author</option>
              <option>votes</option>
            </select>
            <select className={styles.select} onChange={orderHandler}>
              <option value={'DESC'}>latest</option>
              <option value={'ASC'}>oldest</option>
            </select>
          </div>
          <ul className={styles.comments}>
            {comments.map((comment) => {
              return <EachComment key={comment.comment_id} comment={comment} />;
            })}
          </ul>
        </>
      )}
    </>
  );
};

export default CommentsByArticleId;
