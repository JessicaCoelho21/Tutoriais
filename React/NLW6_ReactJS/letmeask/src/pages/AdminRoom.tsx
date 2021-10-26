import React from "react";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useHistory, useParams } from "react-router-dom";
import "../styles/room.scss";
//import { useAuth } from "../Hooks/useAuth";
import { Question } from "../components/Question";
import { useRoom } from "../Hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

type RoomParams = {
  id: string;
};

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };

  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  //const { user } = useAuth();
  const { title, questions } = useRoom(roomId);
  const history = useHistory();

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm("Tem a certeza que desejas eliminar esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  };

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  };

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  };

  const handleEndRoom = async () => {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  };

  return (
    <div id="page-room">
      <header>
        <div className="container">
          <img src={logoImg} alt="Let Me Ask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Fechar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {
            //map = percorrer cada conteúdo de questions, e retornar um componente novo (neste caso, Question) para cada item de questions
            questions.map((q: QuestionType) => {
              return (
                <Question
                  content={q.content}
                  author={q.author}
                  key={q.id}
                  isAnswered={q.isAnswered}
                  isHighlighted={q.isHighlighted}
                >
                  {!q.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(q.id)}
                      >
                        <img src={checkImg} alt="Marcar como respondida" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(q.id)}
                      >
                        <img src={answerImg} alt="Destacar pergunta" />
                      </button>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    <img src={deleteImg} alt="Eliminar pergunta" />
                  </button>
                </Question>
              );
            })
          }
        </div>
      </main>
    </div>
  );
};
