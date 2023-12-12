import React from 'react';
import estilo from './loading.module.css';

const Loading = () => {
  return (
    <div className={estilo.full_screen_gif}>
      <img src="/loading.png" alt="GIF" />
    </div>
  );
};

export default Loading;