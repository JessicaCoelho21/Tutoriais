import React from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { database } from "../services/firebase";

export const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = React.useState("");

  const handleCreateRoom = async () => {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();

    if(roomCode.trim() === '') {
      return;
    }

    //vai à bd obter todos os id's de todas as salas
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    //se o id introduzido no form não existir, lança erro
    if(!roomRef.exists()) {
      alert('Room does not exist.');
      return;
    }

    //se existir, redireciona para a página da sala que tem o código que o utilizador introduziu no form
    history.push(`/rooms/${roomCode}`);
  };

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração de perguntas e respostas" />

        {/*<strong>Crie salas de Q &amp; A em direto</strong>*/}

        <strong>Todas as perguntas têm uma resposta.</strong>

        {/*<p>Tire as dúvidas dos seus espetadores em tempo real</p>*/}

        <p>Aprende e partilha o teu conhecimento com outras pessoas</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let Me Ask" />
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google" />
            Cria uma sala com o Google
          </button>

          <div className="separator">ou entra numa sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Introduz o código da sala"
              onChange={(e) => setRoomCode(e.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
