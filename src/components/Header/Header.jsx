import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <Link to={'/articles'} className={styles.header}>
      <h1 className={styles.header__logo}>
        n<span className={styles['header__logo--letter']}>C</span>
        <span className={styles['header__logo--rest']}>news</span>
      </h1>
    </Link>
  );
};

export default Header;
