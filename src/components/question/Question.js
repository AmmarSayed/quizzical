import React from 'react';
import SelectionBtn from './SelectionBtn';
const Question = (props) => {
  const { id, correct_answer, question, answersArr, selectedAnswer } = props.question;
  const { selectAnswerFunction, gameEnd } = props;

  console.log(correct_answer);

  return (
    <article className='question'>
      <h2>{question}</h2>
      <div className='question--answers'>
        {answersArr.map((answer) => (
          <SelectionBtn
            key={answer}
            answer={answer}
            selectAnswer={() => selectAnswerFunction(id, answer)}
            selectedAnswer={selectedAnswer}
            gameEnd={gameEnd}
            correct_answer={correct_answer}
          />
        ))}
      </div>
    </article>
  );
};

export default Question;
