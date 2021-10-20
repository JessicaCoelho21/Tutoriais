import React from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { database } from "../services/firebase";

export const NewRoom = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = React.useState("");
  const history = useHistory();

  //FormEvent -> tipo da estrutura do formulário, que contem tudo o que existe dentro dele
  const handleCreateRoom = async (event: React.FormEvent) => {
    //faz com que a página não atualize para ela mesma quando clicado o botão de submissão
    event.preventDefault();

    //trim() -> remover espaços tanto à esquerda como à direita
    if(newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref("rooms");
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    //firebaseRoom.key -> id da sala para onde se pretende navegar
    history.push(`/rooms/${firebaseRoom.key}`);
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

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar</Button>
          </form>

          <p>
            Queres entrar numa sala já existente? <Link to="/">Clica aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
