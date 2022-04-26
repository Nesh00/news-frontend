import styles from '../../css/User.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Logo from './Logo';
import { AvatarIcon } from '../Buttons/Buttons';

const User = ({ children, isOpen, setIsOpen, logout, setLogout }) => {
  const { user, setUser } = useContext(UserContext);

  const openLoginHandler = () => {
    setIsOpen((currOpen) => !currOpen);
  };

  return (
    <header className={styles.user__container}>
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
          <button className={styles.open__login} onClick={openLoginHandler}>
            <AvatarIcon size={'3x'} />
          </button>
          {isOpen ? children : null}
        </>
      )}
    </header>
  );
};

export default User;
