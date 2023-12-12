"use client"
//importe dos itens necessários e estilos
import Carousel from '@/src/carrosel';
import styles from './page.module.css';
import Header from './components/header/page.jsx';
import Footer from './components/footer/page.jsx';

//criação da função app
function App() {
  return (
    <div className={styles.body}>
      {/*chamada do header*/}
      <Header />
      {/*criação da div principal*/}
      <div className={styles.tudao2}>
        <div className={styles.tudao}>
          <div className={styles.container}>
            {/*adição do banner principal*/}
            <img className={styles.image} src="/banner.jpg" alt="Banner" />
          </div>
          <div className={styles.div1}>
            {/*adiçao do título*/}
            <img className={styles.titleImg} src="/Bem vindos ao Jogos!.png" alt="Bem-vindos aos Jogos" />
          </div>
          <img className={styles.historiaImg} src="/historiaJogos.jpeg" alt="historiaJogos" />
          {/*criação da div sobre a história do filme*/}
          <div className={styles.separar}>
            <h2 className={styles.HistoriaTitle}>HISTÓRIA</h2>
          </div>
          <p className={styles.historiaP}>Na região antigamente conhecida como América do Norte, a Capital de Panem controla 12 distritos e os força a escolher um garoto e uma garota, conhecidos como tributos, para competir em um evento anual televisionado. Todos os cidadãos assistem aos temidos jogos, no qual os jovens lutam até a morte, de modo que apenas um saia vitorioso. A jovem Katniss Everdeen, do Distrito 12, confia na habilidade de caça e na destreza com o arco, além dos instintos aguçados, nesta competição mortal.</p>
          <div className={styles.div2}>
          </div>
          <div className={styles.separar}>
            {/*curiosidades sobre o filme*/}
            <h2 className={styles.CuriosidadesTitle}>CURIOSIDADES</h2>
          </div>
          <div className={styles.separar2}>
            <div className={styles.card}>
              <img className={styles.curiosidadesImg} src="/curiosidade1.jpg" alt="curiosidade" width={150} height={175}/>
              <p className={styles.CuriosidadesP}>Jogos Vorazes é uma das sagas mais importantes da atualidade. A estreia foi em 2008 com o lançamento do livro 'Hunger Games' da escritora norte-americana Suzanne Collins.</p>
            </div>
            <div className={styles.card}>
              <img className={styles.curiosidadesImg} src="/jennifer.jpg" alt="duvidas" width={150} height={175}/>
              <p className={styles.CuriosidadesP}>A escolha por Jennifer Lawrence não foi fácil. Ela disputou o papel de Katniss com as atrizes Abigail Breslin, Emma Roberts e Chloe Moretz.</p>
            </div>
            <div className={styles.card}>
              <img className={styles.curiosidadesImg} src="/suzzane.jpg" alt="duvidas" width={150} height={175}/>
              <p className={styles.CuriosidadesP}>Suzanne Collins, criadora da saga "Jogos Vorazes", disse que as partes mais difíceis de escrever nos livros foram as mortes e a violência entre os personagens tão jovens.</p>
            </div>
          </div>
          <img className={styles.inspiracaoImg} src="/inspiracao.jpg" alt="inspiração" />
          <div className={styles.separar}>
            <h2 className={styles.InspiracaoTitle}>INSPIRAÇÃO E ORIGEM</h2>
          </div>
          <p className={styles.InspiracaoP}>Segundo Suzanne Collins, a ideia para The Hunger Games surgiu enquanto ela assistia a diferentes canais de televisão. Em um canal, a autora observou pessoas competindo em um reality show e em outro viu cenas da Guerra no Iraque. As duas coisas "começaram a se confundir de um modo muito inquietante" e a ideia para o livro que depois virou filme foi formada. O mito grego de Teseu serviu de base para a história - a personagem principal Katniss seria como um Teseu futurista - e os gladiadores romanos completaram o quadro. A sensação de perda que Suzanne teve quando o pai prestou serviço militar na Guerra do Vietnã também contribuiu para o desenvolvimento do livro, no qual a protagonista perdeu o pai aos onze anos de idade por um horrível acidente nas minas - cinco anos antes do início da história.</p>

          <div className={styles.carrossel}>
            {/*chamada carrossel*/}
            <Carousel />
          </div>
        </div>
        <div>
        </div>
        {/*chamada footer*/}
        <Footer />
      </div>
    </div>
  );
};
//exporte da função
export default App;
