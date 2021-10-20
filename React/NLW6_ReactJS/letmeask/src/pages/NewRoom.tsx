import React from "react";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export const NewRoom = () => {
  const { user } = useAuth();

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
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar</Button>
          </form>

          <p>Queres entrar numa sala já existente? <Link to="/">Clica aqui</Link></p>
        </div>
      </main>
    </div>
  );
};
