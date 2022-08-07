import { useEffect, useState } from 'react';
import './App.css';
import Header from './Componenets/Header/Header';
import ProgressBar from './Componenets/ProgressBar/ProgressBar';
import QuizMain from './Componenets/QuizMain/QuizMain';
import Layout from './Layout/Layout';
import {
  Link, useNavigate, BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import ScoreCard from './Componenets/ScoreCard/ScoreCard';
import Home from './Componenets/Home/Home';

function App() {


  // const questions = [
  //   {
  //     questionText: 'What is the capital of France?',
  //     answerOptions: [
  //       { answerText: 'New York', isCorrect: false },
  //       { answerText: 'London', isCorrect: false },
  //       { answerText: 'Paris', isCorrect: true },
  //       { answerText: 'Dublin', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'Who is CEO of Tesla?',
  //     answerOptions: [
  //       { answerText: 'Jeff Bezos', isCorrect: false },
  //       { answerText: 'Elon Musk', isCorrect: true },
  //       { answerText: 'Bill Gates', isCorrect: false },
  //       { answerText: 'Tony Stark', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'The iPhone was created by which company?',
  //     answerOptions: [
  //       { answerText: 'Apple', isCorrect: true },
  //       { answerText: 'Intel', isCorrect: false },
  //       { answerText: 'Amazon', isCorrect: false },
  //       { answerText: 'Microsoft', isCorrect: false },
  //     ],
  //   },
  //   {
  //     questionText: 'How many Harry Potter books are there?',
  //     answerOptions: [
  //       { answerText: '1', isCorrect: false },
  //       { answerText: '4', isCorrect: false },
  //       { answerText: '6', isCorrect: false },
  //       { answerText: '7', isCorrect: true },
  //     ],
  //   },
  // ];


  // const [questionAre, setQuestionsAre] = useState([]);
  // const [currentQuestion, setCurrentQuestion] = useState(0)


  // const changeCurrentQuestion = (value) => {
  //   setCurrentQuestion(value)
  // }

  // console.log(currentQuestion, 'currentQuestion in appp')


  // useEffect(() => {
  //   const QuizFetch = async () => {
  //     const res = await fetch("https://the-trivia-api.com/api/questions?categories=food_and_drink,general_knowledge&limit=10&region=AU&difficulty=easy")
  //     const data = await res.json()

  //     setQuestionsAre(data.map((item) => {
  //       const newarray = item.incorrectAnswers

  //       // console.log(newarray.length, 'length')

  //       let randomIndex;
  //       for (let i = 0; i < newarray.length; i++) {
  //         randomIndex = Math.floor(Math.random() * newarray.length + 1);
  //         // console.log(randomIndex, 'random index')
  //       }
  //       newarray.splice(randomIndex, 0, item.correctAnswer);
  //       // console.log(newarray, 'newArray after adding')
  //       return {
  //         options: newarray,
  //         question: item.question,
  //         correctAnswer: item.correctAnswer,

  //       }
  //     }))
  //   }
  //   QuizFetch()
  // }, [])

  // console.log(questionAre, 'questionAre')
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/quizmain" element={<QuizMain />} />
            <Route path="/scorecard" element={<ScoreCard />} />
          </Route>
          {/* <Route path="/scorecard" element={<ScoreCard />} /> */}
        </Routes>
      </BrowserRouter>
      {/* <Header />
      <ProgressBar
        changeCurrentQuestion={changeCurrentQuestion}
        currentQuestion={currentQuestion}
        questionAre={questionAre}
      />
      <QuizMain
        changeCurrentQuestion={changeCurrentQuestion}
        currentQuestion={currentQuestion}
        questionAre={questionAre} /> */}
    </div>
  );
}

export default App;
