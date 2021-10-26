import React from "react";
import '../styles/question.scss';
import cx from 'classnames';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };

    children?: React.ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
}

export const Question = (props: QuestionProps) => {
    const {content, author, children, isAnswered = false, isHighlighted = false} = props;

    return(
        <div className={cx('question', { answered: isAnswered }, { highlighted: isHighlighted && !isAnswered })}>
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