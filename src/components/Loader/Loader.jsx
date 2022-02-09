import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loader = () => {
  return <FontAwesomeIcon icon={faSpinner} size='8x' spin />;
};

export default Loader;
