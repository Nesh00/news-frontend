import { Link } from 'react-router-dom';
import styles from './Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserCircle,
  faThumbsUp,
  faThumbsDown,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';

const Article = ({ article }) => {
  return (
    <li key={article.article_id} className={styles.articles__item}>
      <Link
        to={`/articles/${article.article_id}`}
        className={styles.articles__link}
      >
        <div className={styles['articles__user_container']}>
          <span className={styles.articles__user_details}>
            <FontAwesomeIcon
              icon={faUserCircle}
              size='2x'
              className={styles.articles__user_avatar}
            />
            {article.author}
          </span>
          <span className={styles.articles__user_details}>
            {article.created_at}
          </span>
        </div>
        <h2 className={styles.articles__header}>{article.title}</h2>
        <div className={styles['articles__votes--container']}>
          <FontAwesomeIcon icon={faThumbsUp} size='2x' color='#ff9933' />
          <span className={styles.articles__vote}>{article.votes}</span>
          <FontAwesomeIcon
            icon={faThumbsDown}
            size='2x'
            color='#ff9933'
            className={styles['articles__btn--down']}
          />
          <FontAwesomeIcon
            icon={faCommentDots}
            size='2x'
            color='#b9b5b5'
            className={styles.articles__comments}
          />
        </div>
      </Link>
    </li>
  );
};

export default Article;
