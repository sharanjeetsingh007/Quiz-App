import React, { useEffect, useState } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar';
import './QuizMain.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";
import ScoreCard from '../ScoreCard/ScoreCard';
import Option from '../Option/Option';
import Button from '@mui/material/Button';




function QuizMain() {

    // States
    const [changeCurrentQuestion, currentQuestionNumber, questionAre, , score, changeScore] = useOutletContext()
    const [finalReport, setFinalReport] = useState([])
    const [finalReportVisible, setFinalReportVisible] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState("")
    const [selected, setSelected] = useState(-1)
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(-4)
    const [submitOnce, setSubmitOnce] = useState(false);

    const [answerChoosen, setAnswerChoosen] = useState("")
    const [answerChoosenWrong, setAnswerChoosenWrong] = useState("")


    const selectOption = (option) => {
        setSelected(option);
        sessionStorage.setItem("option", option)
    }

    const changeCorrectAnswer = (value) => {
        setCorrectAnswer(value)
    }



    // getting data with use from react-router-dom
    const location = useLocation();
    const { chooseQuizType } = location.state;
    // console.log(chooseQuizType, 'location')



    // const chooseQuizType = "hi"
    // Next button
    const handleButtonNext = () => {
        if (chooseQuizType == "withAnsers") {
            if (!submitOnce) {
                return alert("Question can't be skipped")
            }
            const nextQuestion = currentQuestionNumber + 1;
            if (nextQuestion >= questionAre.length) {
                alert("Quiz complete")
                setFinalReportVisible(true)
                changeCurrentQuestion(100)
                setSelected(-1)
                setSubmitOnce(false)
                setCorrectAnswer("")
                setCorrectAnswerIndex(-1)
                sessionStorage.clear()
                sessionStorage.setItem("submitOnce", false)
                setAnswerChoosen("")
                setAnswerChoosenWrong("")

            } else {
                changeCurrentQuestion(nextQuestion)
                setSelected(-1)
                setSubmitOnce(false)
                setCorrectAnswer("")
                setCorrectAnswerIndex(-1)
                sessionStorage.setItem("currentQuestion", nextQuestion)
                sessionStorage.removeItem("option")
                sessionStorage.setItem("submitOnce", false)
                sessionStorage.removeItem("correctAnswerIndex")
                setAnswerChoosen("")
                setAnswerChoosenWrong("")
            }
        }
    }

    // Clicking on the option
    const handleClick = (index) => {
        if (chooseQuizType == "withAnsersOnFinish") {
            const nextQuestion = currentQuestionNumber + 1;
            const answersCurrentQuestion = questionAre[currentQuestionNumber].options.map((item) => item)
            if (answersCurrentQuestion[index] == questionAre[currentQuestionNumber].correctAnswer) {
                console.log('Correct answer')
                changeScore(score + 1)
                sessionStorage.setItem("score", score + 1)
            } else {
                console.log('Wrong answer')
            }
            setFinalReport(prevState => {
                const newItem = [...prevState, {
                    question: questionAre[currentQuestionNumber].question,
                    correctAnswer: questionAre[currentQuestionNumber].correctAnswer,
                    yourAnswer: answersCurrentQuestion[index]
                }]
                sessionStorage.setItem("finalReport", JSON.stringify(newItem))
                return newItem;
            })
            setSelected(-1)
            sessionStorage.setItem("option", -1)

            if (nextQuestion >= questionAre.length) {
                alert("Quiz complete")
                setFinalReportVisible(true)
                changeCurrentQuestion(100)
                sessionStorage.clear()

            } else {
                changeCurrentQuestion(nextQuestion)
                sessionStorage.setItem("currentQuestion", nextQuestion)
            }
        }
    }

    // Submit button
    const handleSubmit = async () => {
        if (chooseQuizType == "withAnsers") {
            if (selected === -1) {
                return alert("Select one option to proceed")
            }
            if (submitOnce == true) {
                return alert("Click on next button")
            }
            const answersCurrentQuestion = questionAre[currentQuestionNumber].options.map((item) => item)
            setCorrectAnswerIndex(answersCurrentQuestion.indexOf(questionAre[currentQuestionNumber].correctAnswer))
            sessionStorage.setItem("correctAnswerIndex", answersCurrentQuestion.indexOf(questionAre[currentQuestionNumber].correctAnswer))
            if (answersCurrentQuestion[selected] == questionAre[currentQuestionNumber].correctAnswer) {
                setAnswerChoosen("Correct Answer")
                setSubmitOnce(true)
                changeScore(score + 1)
                sessionStorage.setItem("score", score + 1)
                sessionStorage.setItem("submitOnce", true)

            } else {
                setAnswerChoosenWrong("Wrong  Answer")
                changeCorrectAnswer(questionAre[currentQuestionNumber].correctAnswer)
                setSubmitOnce(true)
                sessionStorage.setItem("submitOnce", true)
            }
            setFinalReport(prevState => {
                const newItem = [...prevState, {
                    question: questionAre[currentQuestionNumber].question,
                    correctAnswer: questionAre[currentQuestionNumber].correctAnswer,
                    yourAnswer: answersCurrentQuestion[selected]
                }]
                sessionStorage.setItem("finalReport", JSON.stringify(newItem))
                return newItem;
            })
        }
    }

    // Setting states after refresh from session storage
    useEffect(() => {
        if (sessionStorage.getItem("currentQuestion")) {
            changeCurrentQuestion(parseInt(sessionStorage.getItem("currentQuestion")))
        }

        if (sessionStorage.getItem("submitOnce")) {
            setSubmitOnce(JSON.parse(sessionStorage.getItem("submitOnce")))
        }


        if (sessionStorage.getItem("option")) {
            setSelected(parseInt(sessionStorage.getItem("option")))
        }

        if (sessionStorage.getItem("correctAnswerIndex")) {
            setCorrectAnswerIndex(parseInt(sessionStorage.getItem("correctAnswerIndex")))
        }


        if (sessionStorage.getItem("finalReport")) {
            setFinalReport(JSON.parse(sessionStorage.getItem("finalReport")))
        }

        if (sessionStorage.getItem("score")) {
            changeScore(parseInt(sessionStorage.getItem("score")))
        }

    }, [])

    return (<>
        {finalReportVisible ? <ScoreCard finalReport={finalReport} score={score} /> :
            <div className='quizMain'>
                <ProgressBar
                    currentQuestion={currentQuestionNumber}
                />
                <div className='buttons__quizMain'>
                    <p><span>Q</span>{" "}{currentQuestionNumber + 1}/{questionAre.length}</p>
                    {chooseQuizType == "withAnsers" && <Button variant="outlined"
                        onClick={handleButtonNext}
                    >N<span>ext</span></Button>}
                </div>
                <div className='quizMain__main'>
                    <div className='questions'>
                        <h3>{questionAre && questionAre[currentQuestionNumber]?.question}</h3>
                    </div>
                    <div className='options'>
                        {questionAre && questionAre[currentQuestionNumber]?.options.map((item, index) => {
                            return <Option
                                selected={selected === index}
                                selectOption={selectOption}
                                correctAnswerIndex={correctAnswerIndex === index}
                                handleClick={handleClick}
                                key={index}
                                item={item}
                                index={index}
                            />
                        })}
                        <p
                            style={{ color: "green" }}
                        >{answerChoosen}</p>
                        <p
                            style={{ color: "red" }}
                        >{answerChoosenWrong}</p>
                    </div>
                    <div className='submit__button'>
                        {chooseQuizType == "withAnsers" && <Button variant="contained"
                            onClick={handleSubmit}
                        >S<span>ubmit</span></Button>}
                    </div>
                </div>
            </div >
        }
    </>
    )
}

export default QuizMain;