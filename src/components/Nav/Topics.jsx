import styles from '../../css/Topics.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../../utils/api';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsData) => setTopics(topicsData));
  }, []);

  return (
    <nav>
      <ul className={styles.topics__container}>
        <li key={'home'} className={styles.topics__item}>
          <Link to={`/articles`} className={styles.topics__link}>
            All
          </Link>
        </li>
        {topics.map((topic) => {
          return (
            <li key={topic.slug} className={styles.topics__item}>
              <Link
                to={`/articles?topic=${topic.slug}`}
                className={styles.topics__link}
              >
                {topic.slug}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Topics;
