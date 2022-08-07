import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import QuizMain from '../QuizMain/QuizMain';
import { useOutletContext } from "react-router-dom";





function Home() {
    const [changeCurrentQuestion, currentQuestionNumber, questionAre, reCallApi, score, changeScore] = useOutletContext();

    // console.log(score, 'score in hommee')
    const navigate = useNavigate();
    const [chooseQuizType, setChooseQuizType] = useState(null)

    // Redirecting as per button click
    useEffect(() => {
        if (chooseQuizType == "withAnsers") {
            navigate("/quizmain", { state: { chooseQuizType: chooseQuizType } })
            reCallApi(true)
        } else if (chooseQuizType == "withAnsersOnFinish") {
            navigate("/quizmain", { state: { chooseQuizType: chooseQuizType } })
            reCallApi(true)

        } else {
            return;
        }
    }, [chooseQuizType])

    useEffect(() => {
        changeCurrentQuestion(0)
        changeScore(0)
        sessionStorage.clear()
    }, [])


    return (
        <div className='home'>
            <div className='home__main'>
                <div className='choose__quiztype'>
                    <button
                        onClick={
                            () => {
                                setChooseQuizType("withAnsers")
                            }}
                    >Practice Mode</button>
                    <button
                        onClick={
                            () => {
                                setChooseQuizType("withAnsersOnFinish")
                            }}
                    >Test Mode</button>
                </div>
            </div>
        </div>
    )
}

export default Home