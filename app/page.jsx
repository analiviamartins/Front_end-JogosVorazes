import styles from './page.module.css';

function App() {
  return (
    <div >
      <div className={styles.container}>
      <img className={styles.image} src="/banner.jpg" alt="Banner" width={1280} height={500}/>
      </div>
      <div>
      <h1 className={styles.title}>Olá, mundo!</h1>
      </div>
      </div>
    
  );
};

export default App;

