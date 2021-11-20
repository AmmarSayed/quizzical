import React, { useEffect, useState } from 'react';
import Question from './question/Question';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [wining, setWining] = useState([]);
  const [gameEnd, setGameEnd] = useState(false);
  const [numberOfCorrect, setNumberOfcorrect] = useState(0);

  function evalGame() {
    setGameEnd(true);
  }
  function selectAnswerFunction(id, selectedAnswer) {
    setQuestions((prev) =>
      prev.map((quest) => {
        if (quest.id === id) {
          return { ...quest, selectedAnswer };
        }
        return { ...quest };
      })
    );
  }

  async function getQuestions() {
    const res = await fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple');
    const data = await res.json();

    // create a new array of questions
    const newArr = data.results.map((quest) => {
      const { correct_answer, incorrect_answers, question } = quest;
      // set a random position for the correct answer
      const random = Math.floor(Math.random() * incorrect_answers.length);
      const answersArr = [...incorrect_answers];
      answersArr.splice(random, 0, correct_answer);
      // new question setup
      const newQuestion = {
        id: nanoid(),
        question,
        answersArr,
        correct_answer,
        selectedAnswer: '',
      };
      return newQuestion;
    });
    setQuestions(newArr);
  }

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    // on questions Change, check if a wining situation
    const correctAnswers = questions.map(({ correct_answer }) => correct_answer);
    const selected = questions.map(({ selectedAnswer }) => selectedAnswer);
    let userCorrectAnswers = 0;
    selected.forEach((ans) => {
      if (correctAnswers.includes(ans)) userCorrectAnswers += 1;
    });

    setNumberOfcorrect(userCorrectAnswers);
    setWining(userCorrectAnswers >= 3);
  }, [questions]);

  function resetGame() {
    getQuestions();
    setGameEnd(false);
  }

  const questionsElement = questions.map((question) => (
    <Question key={question.id} question={question} selectAnswerFunction={selectAnswerFunction} gameEnd={gameEnd} />
  ));

  return (
    <main>
      {gameEnd && wining && <Confetti />}
      <section className='container'>
        {!questions.length ? (
          <h1>...loading</h1>
        ) : (
          <>
            {questionsElement}
            <div className='quiz-score '>
              {gameEnd && <p>You scored {numberOfCorrect}/5 correct answers</p>}

              {gameEnd ? (
                <button onClick={resetGame} className='btn'>
                  Play again
                </button>
              ) : (
                <button onClick={evalGame} className='btn'>
                  Check answers
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default QuizPage;
