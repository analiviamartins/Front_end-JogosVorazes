import styles from './page.module.css';

function App() {
  return (
    <div className='escuro'>
      <div className={styles.container}>
      <img src="/banner.jpg" alt="Banner" className={styles.banner} width={1263} height={600}/>
      </div>
      <div>
      <h1 className={styles.title}>Olá, mundo!</h1>
      </div>
      </div>
    
  );
};

export default App;

