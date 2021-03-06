import styles from '../../css/Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to={'/articles'} className={styles.logo}>
      <h1 className={styles.logo__header}>
        n<span className={styles['logo--letter']}>C</span>
        <span className={styles['logo--rest']}>news</span>
      </h1>
    </Link>
  );
};

export default Logo;
