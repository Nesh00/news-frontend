import { Fade } from 'react-slideshow-image';
import { fadeImages } from '../../images/fadeImages';
import 'react-slideshow-image/dist/styles.css';
import styles from './Slider.module.css';

const SliderImg = () => {
  const fadeProperties = {
    duration: 4000,
    autoplay: true,
    pauseOnHover: false,
  };

  return (
    <div className={`slide-container ${styles.slider__container}`}>
      <Fade {...fadeProperties}>
        {fadeImages.map((image) => {
          return (
            <div key={image.caption} className='each-fade'>
              <div>
                <img
                  src={image.url}
                  alt={image.caption}
                  className={styles.slider__img}
                />
              </div>
              <p className={styles.slider__caption}>{image.caption}</p>
            </div>
          );
        })}
      </Fade>
    </div>
  );
};

export default SliderImg;
