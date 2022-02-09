import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './User.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/User';
import Logo from '../Logo/Logo';

const User = ({ children, isOpen, setIsOpen, logout, setLogout }) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.user__container}>
      <Logo />
      {user ? (
        <>
          <p className={styles.username}>{user.username}</p>
          <img
            src={user.avatar_url}
            alt={user.name}
            className={styles.avatar_url}
            onClick={() => setLogout((currLogout) => !currLogout)}
          />
          {logout && (
            <p
              className={styles.logout}
              onClick={() => {
                setIsOpen((currOpen) => !currOpen);
                setUser();
              }}
            >
              Logout
            </p>
          )}
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faUserCircle}
            size='4x'
            className={styles.login__img}
            onClick={() => setIsOpen((currOpen) => !currOpen)}
          />
          {isOpen ? children : null}
        </>
      )}
    </div>
  );
};

export default User;
