import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArticles } from '../../utils/api';
import Loader from '../Loader/Loader';
import Article from './Article';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const [topic] = searchParams.values();
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
    getArticles(topic, sortBy, order).then((articlesData) => {
      setArticles(articlesData);
      setIsLoading(false);
    });
  }, [topic, sortBy, order]);

  return (
    <main>
      <div className={`${styles.select__container} ${styles.select__articles}`}>
        <h1 className={styles.articles__header}>{topic ? topic : 'All'}</h1>
        <select className={styles.select} onChange={sortByHandler}>
          <option value={'created_at'}>created at</option>
          <option>author</option>
          <option>votes</option>
        </select>
        <select className={styles.select} onChange={orderHandler}>
          <option value={'DESC'}>
            {sortBy === 'author'
              ? 'Z - A'
              : sortBy === 'votes'
              ? 'most'
              : 'latest'}
          </option>
          <option value={'ASC'}>
            {sortBy === 'author'
              ? 'A - Z'
              : sortBy === 'votes'
              ? 'least'
              : 'oldest'}
          </option>
        </select>
      </div>
      <ul className={styles.articles__list}>
        {isLoading ? (
          <Loader />
        ) : (
          articles.map((article) => {
            return (
              <li
                key={article.article_id}
                className={styles.article__item}
                title='View Article'
              >
                <Article article={article} />
              </li>
            );
          })
        )}
      </ul>
    </main>
  );
};

export default Articles;
