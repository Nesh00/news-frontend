import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArticles } from '../../utils/api';
import styles from './Articles.module.css';
import Article from './Article/Article';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [searchParams] = useSearchParams();
  const [topic] = searchParams.values();

  useEffect(() => {
    getArticles(topic).then((articlesData) => setArticles(articlesData));
  }, [topic]);

  return (
    <ul className={styles.articles__list}>
      <h1 className={styles.articles__header}>{topic ? topic : 'All'}</h1>
      {articles.map((article) => {
        return <Article key={article.article_id} article={article} />;
      })}
    </ul>
  );
};

export default Articles;
