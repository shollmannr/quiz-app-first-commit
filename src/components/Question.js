import React, { useContext } from 'react';
import QuizContext from '../context/QuizContext';
// function that pulls the questions from the App.js and adds them to the app
function Question() {
    const { state } = useContext(QuizContext);
    const { currentQuestion, questions } = state;
    const question = questions[currentQuestion];
    return <h1>{question.question}</h1>;
}

export default Question;