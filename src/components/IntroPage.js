import React from 'react';

const IntroPage = (props) => {
  return (
    <main className='main'>
      <div className='main--intro-page'>
        <h1>Quizzical</h1>
        <p>A fun Quiz game</p>
        <button onClick={props.setStart} className='btn'>
          Start Quiz
        </button>
      </div>
    </main>
  );
};

export default IntroPage;
