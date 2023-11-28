
import styles from './page.module.css';
import VideoPlayer from '@/src/VideoPlayer';

function App() {
  return (
    <div>
    <div className='escuro'>
      <div className={styles.container}>
      <img src="/banner.jpg" alt="Banner" className={styles.banner} width={1270} height={600}/>
      </div>
      <div className={styles.video}>
      <VideoPlayer />
      </div>
      </div>
    </div>
  );
};

export default App;
