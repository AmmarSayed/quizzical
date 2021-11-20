import { useState } from 'react';
import IntroPage from './components/IntroPage';
import QuizPage from './components/QuizPage';

function App() {
  const [start, setStart] = useState(true);

  return <div className='App'>{!start ? <IntroPage setStart={() => setStart(true)} /> : <QuizPage />}</div>;
}

export default App;
