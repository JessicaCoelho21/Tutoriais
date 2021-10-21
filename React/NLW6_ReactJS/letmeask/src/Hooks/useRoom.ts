import React from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };

  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export const useRoom = (roomId: string) => {
  const [questions, setQuestions] = React.useState<QuestionType[]>([]); //estado do tipo array de Question
  const [title, setTitle] = React.useState("");
  const { user } = useAuth();

  React.useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    //segundo a documentação do firebase (NLW episódio 3), estratégia de event listener de javascript
    //room.once -> buscar um item, room.on -> mais que um item
    //de todas as vezes que se adicione uma nova pergunta, ao utilizar roomRef.on, a lista de perguntas vai atualizar, já que o on ouve sempre novas perguntas
    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighlighted: value.isHighlighted,
            likeCount: Object.values(value.likes ?? {}).length,
            //se o utilizador ainda não tiver dado like, o find não irá devolver nada. o último ? quer dizer que, se não tiver encontrado nada, nem sequer vai aceder à posição 0
            likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          };
        }
      );

      setQuestions(parsedQuestions);
      setTitle(databaseRoom.title);
    });

    //remove todos os event listeners que existem na sala, segundo o firebase
    return () => {
      roomRef.off("value");
    };
  }, [roomId, user?.id]); //sempre que o roomID ou o id do utilizador mudar, o código dentro de useEffect irá repetir-se

  return { questions, title };
};
