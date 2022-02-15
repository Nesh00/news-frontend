import styles from '../../css/Articles&Comments.module.css';
import { useEffect, useState } from 'react';
import { getCommentsByArticleId } from '../../utils/api';
import Comment from './Comment';
import Loader from '../Loader/Loader';

const CommentsByArticleId = ({ article_id, comments, setComments }) => {
  const [sortBy, setSortBy] = useState('created_at');
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
  }, [article_id, sortBy, order, setComments]);

  return isLoading ? (
    <Loader />
  ) : (
    <section>
      <div className={styles.select__container}>
        <select className={styles.select} onChange={sortByHandler}>
          <option value={'created_at'}>created at</option>
          <option>author</option>
          <option>votes</option>
        </select>
        <select className={styles.select} onChange={orderHandler}>
          <option value={'DESC'}>latest</option>
          <option value={'ASC'}>oldest</option>
        </select>
      </div>
      <ul className={styles.comments}>
        {comments.map((comment, commentIndex) => {
          return (
            <Comment
              key={commentIndex}
              commentKey={commentIndex}
              comment={comment}
              comments={comments}
              setComments={setComments}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default CommentsByArticleId;
