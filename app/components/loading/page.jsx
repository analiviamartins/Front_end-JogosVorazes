import React, { useState, useEffect } from 'react';
import estilo from './loading.module.css';

const Loading = () => {
 const [showImage, setShowImage] = useState(true);

 useEffect(() => {
   const timer = setTimeout(() => {
     setShowImage(false);
   }, 2000);

   return () => clearTimeout(timer);
 }, []);

 if (!showImage) {
   return null;
 }

 return (
   <div className={estilo.full_screen_gif}>
     <img src="/loadingGif5.gif" alt="GIF" />
   </div>
 );
};

export default Loading;