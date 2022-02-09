import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faClose } from '@fortawesome/free-solid-svg-icons';
import styles from './Login.module.css';
import { getUser } from '../../../utils/api';
import User from '../User/User';

const Login = () => {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);
  const { setUser } = useContext(UserContext);

  const getInput = (event) => {
    setInput(event.target.value);
  };

  const submitUser = (event) => {
    event.preventDefault();
    setUsername(input);
    setInput('');
    setLogout(false);
  };

  useEffect(() => {
    getUser(username).then((usersData) => {
      setUser(usersData);
    });
  }, [username]);

  return (
    <User
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      logout={logout}
      setLogout={setLogout}
    >
      <div className={styles.login__container}>
        <form className={styles.login__form} onSubmit={submitUser}>
          <FontAwesomeIcon
            icon={faClose}
            className={styles.close__btn}
            size='2x'
            onClick={() => setIsOpen((currOpen) => !currOpen)}
          />
          <FontAwesomeIcon icon={faUserCircle} size='4x' />
          <label className={styles.login__label}>
            User
            <input
              type='text'
              value={input}
              placeholder='Enter Username'
              className={styles.login__input}
              onChange={getInput}
            />
          </label>
          <button className={styles.login__btn}>Login</button>
        </form>
      </div>
    </User>
  );
};

export default Login;
