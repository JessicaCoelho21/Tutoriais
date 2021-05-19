import React from "react";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContext, PlayerContextProvider } from "../contexts/PlayerContext";

import "../styles/globals.scss";
import styles from "../styles/app.module.scss";

//O header vai estar em todas as páginas, logótipo é chamado aqui
function MyApp({ Component, pageProps }) {
  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
