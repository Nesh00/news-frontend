import styles from './Nav-Topics.module.css';
import { useEffect, useState } from 'react';
import { getTopics } from '../../utils/api';
import { Link } from 'react-router-dom';

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsData) => setTopics(topicsData));
  }, []);

  return (
    <ul className={styles.topics__container}>
      {topics.map((topic) => {
        return (
          <li key={topic.slug} className={styles.topics__item}>
            <Link to={`/articles`}>{topic.slug}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Topics;
