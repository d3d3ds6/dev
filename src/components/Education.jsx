import React, { useEffect, useState } from 'react';
import { useTrail, animated } from '@react-spring/web'; // Import react-spring hooks
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

const styles = {
  iconStyle: {
    height: 75,
    width: 75,
    margin: 10,
    marginBottom: 0,
    transition: 'transform 0.3s ease-in-out', // Added transition for smooth lifting effect
  },
  introTextContainer: {
    whiteSpace: 'pre-wrap',
  },
};

function Education(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth('90vw');
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth('75vw');
    } else {
      setWidth('50vw');
    }
  }, []);

  // Animation for fade-in effect
  const fadeIn = useTrail(data ? data.education.length : 0, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 220, friction: 25 },
  });

  return (
    <>
      <Header title={header} />
      {data ? (
        <Fade>
          <animated.div style={{ width }} className="section-content-container">
            <Container>
              {fadeIn.map((style, index) => (
                <animated.div key={data.education[index].title} style={style} className="education-item">
                  <h3>{data.education[index].title}</h3>
                  {data.education[index].items.map((item) => (
                    <div key={item.title} style={{ display: 'inline-block' }}>
                      <img
                        style={styles.iconStyle}
                        src={item.icon}
                        alt={item.title}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                      />
                      <p>{item.title}</p>
                    </div>
                  ))}
                </animated.div>
              ))}
            </Container>
          </animated.div>
        </Fade>
      ) : <FallbackSpinner />}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
