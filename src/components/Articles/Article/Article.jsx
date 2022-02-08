import { Link } from 'react-router-dom';
import styles from './Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faRedRiver } from '@fortawesome/free-brands-svg-icons';
import formatDate from '../../../utils/formatDate.util';

const Article = ({ article }) => {
  return (
    <li className={styles.article__item}>
      <Link
        to={`/articles/${article.article_id}`}
        className={styles.articles__link}
      >
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
        <div className={styles.votes__container}>
          <span className={styles.article__comment_count}>
            {article.comment_count} comments
          </span>
          <FontAwesomeIcon
            icon={faRedRiver}
            size='2x'
            color='#b9b5b5'
            transform={{ rotate: 135 }}
            title='View Article'
          />
        </div>
      </Link>
    </li>
  );
};

export default Article;
