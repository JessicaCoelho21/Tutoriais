import React from "react";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useParams } from "react-router-dom";
import "../styles/room.scss";
import { useAuth } from "../Hooks/useAuth";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export const Room = () => {
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = React.useState("");
  const roomId = params.id;
  const { user } = useAuth();
  const [questions, setQuestions] =React.useState<Question[]>([]); //estado do tipo array de Question
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    //segundo a documentação do firebase (NLW episódio 3), estratégia de event listener de javascript
    //room.once -> buscar um item, room.on -> mais que um item
    roomRef.on('value', room => {
        const databaseRoom = room.val();
        const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
        const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
                id: key,
                content: value.content,
                author: value.author,
                isAnswered: value.isAnswered,
                isHighlighted: value.isHighlighted,
            }
        });

        setQuestions(parsedQuestions);
        setTitle(databaseRoom.title);
    });
  }, [roomId]); //sempre que o roomID mudar, o código dentro de useEffect irá repetir-se

  const handleSendQuestion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("É necessário fazer login");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },

      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  };

  return (
    <div id="page-room">
      <header>
        <div className="container">
          <img src={logoImg} alt="Let Me Ask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala: {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que queres perguntar?"
            onChange={(e) => setNewQuestion(e.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faz o login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
};
