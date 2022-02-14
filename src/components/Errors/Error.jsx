import styles from '../../css/Error.module.css';
import errorImg from '../../images/errorImg.png';

const Error = ({ error }) => {
  return (
    <div className={styles.error__container}>
      <h1 className={styles.error__message}>
        <span className={styles.error__code}>{error.status} </span>
        {error.statusText}
      </h1>
      <img src={errorImg} alt='Error' className={styles.error__img} />
    </div>
  );
};

export default Error;
