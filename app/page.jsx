
import styles from './page.module.css';
import VideoPlayer from '@/src/VideoPlayer';

function App() {
  return (
    <>
    <div className='escuro'>
      <div className={styles.container}>
      <img src="/banner.jpg" alt="Banner" className={styles.banner} width={1280} height={600}/>
      </div>
      <VideoPlayer />
      </div>
    </>
  );
};

export default App;
