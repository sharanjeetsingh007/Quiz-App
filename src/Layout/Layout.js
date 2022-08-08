import { useEffect, useState } from 'react';
import Header from '../Componenets/Header/Header';
import ProgressBar from '../Componenets/ProgressBar/ProgressBar';
import QuizMain from '../Componenets/QuizMain/QuizMain';
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import "./Layout.css"

import CircularProgress from '@mui/material/CircularProgress';


function Layout() {


    const [questionAre, setQuestionsAre] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [reCall, setReCall] = useState(false)
    const [loader, setLoader] = useState(true);

    const [score, setScore] = useState(0)

    const gettingsessionStorageData = sessionStorage.getItem("transformData")

    const changeScore = (value) => {
        setScore(value)
    }

    const changeCurrentQuestion = (value) => {
        setCurrentQuestion(value)
    }


    const reCallApi = (value) => {
        setReCall(prev => !prev)
        setLoader(true)
    }

    useEffect(() => {
        const abortController = new AbortController();
        const QuizFetch = async () => {

            if (gettingsessionStorageData) {
                setQuestionsAre(JSON.parse(gettingsessionStorageData))
                setLoader(false)

            } else {
                try {
                    const res = await fetch(
                        'https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10&region=AU&difficulty=medium',
                        {
                            signal: abortController.signal,
                        },
                    )
                    const data = await res.json()
                    const transformData = data.map((item) => {
                        const newarray = item.incorrectAnswers
                        let randomIndex;
                        for (let i = 0; i < newarray.length; i++) {
                            randomIndex = Math.floor(Math.random() * newarray.length + 1);
                        }
                        newarray.splice(randomIndex, 0, item.correctAnswer);
                        return {
                            options: newarray,
                            question: item.question,
                            correctAnswer: item.correctAnswer,
                        }
                    })
                    setQuestionsAre(transformData)
                    sessionStorage.setItem("transformData", JSON.stringify(transformData));
                    setLoader(false)
                } catch (err) {
                    if (abortController.signal.aborted) return;
                    alert(err, "err in getting data")
                }
            }
        }

        QuizFetch()
        return () => {
            abortController.abort();
        };
    }, [reCall])
    return (<>
        {loader ? <div className='loader'><CircularProgress style={{ color: 'black' }} size={50} thickness={2} /></div> :
            <div className='Layout'>
                <Header />
                <Outlet context={[changeCurrentQuestion, currentQuestion, questionAre, reCallApi, score, changeScore]} />
            </div>
        }
    </>


    )
}

export default Layout