import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './User.module.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/User';
import Logo from '../Logo/Logo';

const User = ({ children, isOpen, setIsOpen }) => {
  const { user, setUser } = useContext(UserContext);
  const [logout, setLogout] = useState(false);

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
                setUser();
                setIsOpen((currOpen) => !currOpen);
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
            onClick={() => setIsOpen((currOpen) => !currOpen)}
          />
          {isOpen ? children : null}
        </>
      )}
    </div>
  );
};

export default User;
