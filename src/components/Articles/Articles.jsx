import styles from '../../css/Articles&Comments.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArticles } from '../../utils/api';
import EachArticle from './EachArticle';
import Loader from '../Loader/Loader';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const [topic] = searchParams.values();
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
          <option value={'DESC'}>latest</option>
          <option value={'ASC'}>oldest</option>
        </select>
      </div>
      <ul className={styles.articles__list}>
        {isLoading ? (
          <Loader />
        ) : (
          articles.map((article) => {
            return <EachArticle key={article.article_id} article={article} />;
          })
        )}
      </ul>
    </main>
  );
};

export default Articles;
