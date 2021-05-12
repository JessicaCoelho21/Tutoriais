import { Header } from "../components/Header";
import "../styles/globals.scss";
import styles from "../styles/app.module.scss";
import { Player } from "../components/Player";

//O header vai estar em todas as páginas, logo é chamado aqui
function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </div>
  );
}

export default MyApp;
