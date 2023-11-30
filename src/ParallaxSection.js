import React from 'react';
import styles from './css/parallax.module.css';

const ParallaxImage = () => {
 return (
    <div className="parallax-container">
      <img
      className={styles.image2}
        src="/fogo.png"
        alt="Background Image"
      />
      <div className="content">
        {/* Conteúdo a ser exibido na imagem parallax */}
      </div>
    </div>
 );
};

export default ParallaxImage;