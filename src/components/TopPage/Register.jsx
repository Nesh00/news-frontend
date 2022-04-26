import { useState, useEffect, useContext } from 'react';
import styles from '../../css/Register.module.css';
import { RegisterContext } from '../../contexts/RegisterContext.js';
import { createUser } from '../../utils/api';
import { CloseBtn } from '../Buttons/Buttons';
import Form from '../Form';

const Register = () => {
  const { openRegister, setOpenRegister } = useContext(RegisterContext);
  const [username, setUsername] = useState();
  const [name, setName] = useState();
  const [avatarUrl, setAvatarUrl] = useState();

  const getName = (event) => {
    setName(event.target.value);
  };
  const getUsername = (event) => {
    setUsername(event.target.value);
  };
  const getAvatarUrl = (event) => {
    setAvatarUrl(event.target.value);
  };

  const createUserHandler = (e) => {
    e.preventDefault();
    setName('');
    setUsername('');
    setAvatarUrl('');
  };

  const closeRegisterHandler = () => {
    setOpenRegister((currOpen) => !currOpen);
  };

  useEffect(() => {
    username &&
      name &&
      avatarUrl &&
      createUser(username, name, avatarUrl).then(({ user }) => {
        setOpenRegister(false);
        console.log(user);
      });
  }, []);

  return (
    openRegister && (
      <Form onSubmit={createUserHandler}>
        <CloseBtn size={'2x'} closeEvent={closeRegisterHandler} />
        <p className={styles.register__header}>Register</p>
        <label>
          <input
            type='text'
            value={name}
            className={styles.register__input}
            placeholder='Enter Name'
            required
            onChange={getName}
          />
          <input
            type='text'
            value={username}
            className={styles.register__input}
            placeholder='Enter Username'
            required
            onChange={getUsername}
          />
          <input
            type='text'
            value={avatarUrl}
            className={styles.register__input}
            placeholder='Add Avatar URL'
            required
            onChange={getAvatarUrl}
          />
        </label>
        <button className={styles.register__btn}>Submit</button>
      </Form>
    )
  );
};

export default Register;
