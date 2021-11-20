import React from 'react';

const SelectionBtn = (props) => {
  const { gameEnd, selectedAnswer, answer, correct_answer, selectAnswer } = props;
  const selected = selectedAnswer === answer && 'btn-selected';

  let result = '';

  if (gameEnd) {
    if (selectedAnswer === correct_answer && selected) {
      result = 'correct';
    } else if (selected) {
      result = 'wrong';
    } else if (correct_answer === answer) {
      result = 'correct';
    } else {
      result = 'dumm';
    }
  }

  return (
    <button className={`btn-answer ${selected} ${result}`} onClick={selectAnswer}>
      {answer}
    </button>
  );
};

export default SelectionBtn;
