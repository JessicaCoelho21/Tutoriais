import React from "react";
import '../styles/question.scss';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };

    children?: React.ReactNode;
}

export const Question = (props: QuestionProps) => {
    const {content, author, children} = props;

    return(
        <div className='question'>
            <p>{content}</p>

            <footer>
                <div className='user-info'>
                    <img src={author.avatar} alt={author.name} />
                    <span>{author.name}</span>
                </div>

                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}