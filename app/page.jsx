"use client"
import Carousel from '@/src/carrosel';
import styles from './page.module.css';
import ParallaxSection from '@/src/ParallaxSection';
import Header from './components/header/page.jsx';
import Footer from './components/footer/page.jsx';

function App() {
  return (
    <div className={styles.tudao2}>
      <Header />
      <div className={styles.tudao}>
        <div className={styles.container}>
          <img className={styles.image} src="/banner.jpg" alt="Banner" />
        </div>
      <div className={styles.div1}>
        <h1 className={styles.title}>Bem-vindos aos Jogos!</h1>
      </div>
      <img className={styles.historiaImg} src="/historiaJogos.jpeg" alt="historiaJogos" />
      <div className={styles.separar}>
        <h2 className={styles.HistoriaTitle}>Historia Do Jogos Vorazes</h2>
      </div>
      <p className={styles.historiaP}>Na região antigamente conhecida como América do Norte, a Capital de Panem controla 12 distritos e os força a escolher um garoto e uma garota, conhecidos como tributos, para competir em um evento anual televisionado. Todos os cidadãos assistem aos temidos jogos, no qual os jovens lutam até a morte, de modo que apenas um saia vitorioso. A jovem Katniss Everdeen, do Distrito 12, confia na habilidade de caça e na destreza com o arco, além dos instintos aguçados, nesta competição mortal.</p>
      <div className={styles.div2}>
      </div>
        <img className={styles.curiosidadesImg} src="/duvidas.jpeg" alt="duvidas" />
        <div className={styles.separar}>
          <h2 className={styles.CuriosidadesTitle}>Curiosidades</h2>
        </div>
        <p className={styles.CuriosidadesP}>1-  Jogos Vorazes é uma das sagas mais importantes da atualidade. A estreia foi em 2008 com o lançamento do livro 'Hunger Games' da escritora norte-americana Suzanne Collins.

          2-  A autora é responsável pelo clássico infantil “Clarissa Sabe de Tudo”, série exibida pelo canal SBT e pela Globo.

          3-  Suzanne Collins é formada em Artes Cênicas, Interpretação e Telecomunicações. Depois do sucesso de Jogos Vorazes, foi eleita pela revista Time como uma das pessoas mais influentes do ano de 2010.
        </p>
        <div className={styles.div3}>
        </div>
        <img className={styles.inspiracaoImg} src="/inspiracao.jpg" alt="inspiração" />
        <div className={styles.separar}>
          <h2 className={styles.InspiracaoTitle}>Inspiração e origem</h2>
        </div>
        <p className={styles.InspiracaoP}>Segundo Suzanne Collins, a ideia para The Hunger Games surgiu enquanto ela assistia a diferentes canais de televisão. Em um canal, a autora observou pessoas competindo em um reality show e em outro viu cenas da Guerra no Iraque. As duas coisas "começaram a se confundir de um modo muito inquietante" e a ideia para o livro que depois virou filme foi formada. O mito grego de Teseu serviu de base para a história - a personagem principal Katniss seria como um Teseu futurista - e os gladiadores romanos completaram o quadro. A sensação de perda que Suzanne teve quando o pai prestou serviço militar na Guerra do Vietnã também contribuiu para o desenvolvimento do livro, no qual a protagonista perdeu o pai aos onze anos de idade por um horrível acidente nas minas - cinco anos antes do início da história.</p>

      <div>
        <Carousel />
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default App;

