import styles from '../css/Form.module.css';

const Form = ({ children, submitHandler }) => {
  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={submitHandler}>
        {children}
      </form>
    </div>
  );
};

export default Form;
