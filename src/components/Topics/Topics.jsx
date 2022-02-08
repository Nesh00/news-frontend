import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../../utils/api';
import styles from './Topics.module.css';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsData) => setTopics(topicsData));
  }, []);

  return (
    <ul className={styles.topics__container}>
      <li key={'home'} className={styles.topics__item}>
        <Link to={`/articles`} className={styles.topics__link}>
          All Articles
        </Link>
      </li>
      {topics.map((topic) => {
        return (
          <li key={topic.slug} className={styles.topics__item}>
            <Link
              to={`/articles?topic=${topic.slug}`}
              className={styles.topics__link}
              onClick={(e) => console.log(e.target)}
            >
              {topic.slug}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Topics;
