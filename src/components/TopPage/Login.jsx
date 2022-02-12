import styles from '../../css/Login.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/User';
import { getUser } from '../../utils/api';
import User from './User';
import { AvatarIcon, CloseBtn } from '../Buttons/Buttons';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const submitUser = (event) => {
    event.preventDefault();
    setUsername(input);
    setInput('');
    setLogout(false);
  };

  const closeLoginHandler = () => {
    setIsOpen((currOpen) => !currOpen);
  };

  useEffect(() => {
    getUser(username).then((usersData) => {
      setUser(usersData);
    });
  }, [username, setUser]);

  return (
    <User
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      logout={logout}
      setLogout={setLogout}
    >
      <div className={styles.overlay}>
        <form className={styles.login__form} onSubmit={submitUser}>
          <CloseBtn size={'2x'} closeEvent={closeLoginHandler} />
          <AvatarIcon size={'5x'} />
          <label className={styles.login__label}>
            User
            <input
              type='text'
              value={input}
              placeholder='Enter Username'
              required
              className={styles.login__input}
              onChange={getInput}
            />
          </label>
          <button className={styles.login__btn}>login</button>
        </form>
      </div>
    </User>
  );
};

export default Login;
