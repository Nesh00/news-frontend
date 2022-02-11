import { Fade } from 'react-slideshow-image';
import { sliderImages } from '../../images/sliderImages';
import 'react-slideshow-image/dist/styles.css';
import styles from './Slider.module.css';

const SliderImg = () => {
  const sliderProperties = {
    duration: 5000,
    autoplay: true,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <section className={`slide-container ${styles.slider__container}`}>
      <Fade {...sliderProperties}>
        {sliderImages.map((image) => {
          return (
            <div key={image.caption} className='each-fade'>
              <img
                src={image.url}
                alt={image.caption}
                className={styles.slider__img}
              />
              <p className={styles.slider__caption}>{image.caption}</p>
            </div>
          );
        })}
      </Fade>
    </section>
  );
};

export default SliderImg;
