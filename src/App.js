import React, { useReducer } from 'react';
import Progress from './components/Progress';
import Question from './components/Question';
import Answers from './components/Answers';
import QuizContext from './context/QuizContext';

import {
    SET_ANSWERS,
    SET_CURRENT_QUESTION,
    SET_CURRENT_ANSWER,
    SET_ERROR,
    SET_SHOW_RESULTS,
    RESET_QUIZ,
} from './reducers/types.js';
import quizReducer from './reducers/QuizReducer';

import './App.css';
// function for the questions and answers component.
function App() {
    const questions = [
        {
            id: 1,
            question: 'Which statement about Hooks is not true?',
            answer_a:
                'Hooks are 100% backwards-compatible and can be used side by side with classes',
            answer_b: 'Hooks are still in beta and not available yet',
            answer_c:
                "Hooks are completely opt-in, there's no need to rewrite existing code",
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 2,
            question: 'Which one is not a Hook?',
            answer_a: 'useState()',
            answer_b: 'useConst()',
            answer_c: 'useReducer()',
            answer_d: 'All of the above',
            correct_answer: 'b',
        },
        {
            id: 3,
            question: 'What Hook should be used for data fetching?',
            answer_a: 'useDataFetching()',
            answer_b: 'useApi()',
            answer_c: 'useEffect()',
            answer_d: 'useRequest()',
            correct_answer: 'c',
        },
        {
            id: 4,
            question: 'How many valves does the heart have?',
            answer_a: 'Two()',
            answer_b: 'Four()',
            ansewer_c: 'Three()',
            answer_d: 'Six()',
            correct_answer: 'b'
        },
        {
            id: 5,
            question: 'What was the most streamed show on Netflix in 2020?',
            answer_a:  'The Umbrella Academy()',
            answer_b: 'Lucifer()',
            answer_c: 'Emily in Paris()',
            answer_d: 'The Queens Gambit()',
            correct_answer: 'd'
        },
        {
            id: 6,
            question: 'What is the capital of Iceland?',
            answer_a: 'Kópavogur()',
            answer_b: 'Hafnarfjörður()',
            answer_c: 'Reykjavík()',
            answer_d: 'Akureyri()',
            correct_answer: 'c'
        },
    ];
// second componenet for answers/questions
//     function App() {
//         const questions = [
//             {
//                 id: 1,
//                 question: `What's the biggest animal in the world?',
//                 answer_a: 'Colossal squid`(),
//                 answer_b: 'African elephant'(),
//                 answer_c: 'The blue whale'(),
//                 answer_d: 'Giraffe'(),
//             },
//         ];
// // third componenet for answers/questions
//         function App() {
//             const questions = [
//                 {
//                     id: 1,
//                     question: 'What year was Heinz established?',
//                     answer_a: '1869'(),
//                     answer_b: '1900'(),
//                     answer_c: '1889'(),
//                     answer_d: '1969'(),

//                 },
//             ];

            const initialState = {
                questions,
                currentQuestion: 0,
                currentAnswer: '',
                answers: [],
                showResults: false,
                error: '',
            };

            const [state, dispatch] = useReducer(quizReducer, initialState);
            const { currentQuestion, currentAnswer, answers, showResults, error } = state;

            const question = questions[currentQuestion];
            // error component
            const renderError = () => {
                if (!error) {
                    return;
                }

                return <div className="error">{error}</div>;
            };
            // correct answer function
            const renderResultMark = (question, answer) => {
                if (question.correct_answer === answer.answer) {
                    return <span className="correct">Correct</span>;
                }
                // incorrect answer function
                return <span className="failed">Failed</span>;
            };
            // results page function
            const renderResultsData = () => {
                return answers.map(answer => {
                    const question = questions.find(
                        question => question.id === answer.questionId
                    );

                    return (
                        <div key={question.id}>
                            {question.question} - {renderResultMark(question, answer)}
                        </div>
                    );
                });
            };
            // restart quiz function
            const restart = () => {
                dispatch({ type: RESET_QUIZ });
            };
            // next question function
            const next = () => {
                const answer = { questionId: question.id, answer: currentAnswer };
                // function to ask for an answer to be selected if no answer is selected when the next button is clicked
                if (!currentAnswer) {
                    dispatch({ type: SET_ERROR, error: 'Please select an option' });
                    return;
                }

                answers.push(answer);
                dispatch({ type: SET_ANSWERS, answers });
                dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: '' });

                if (currentQuestion + 1 < questions.length) {
                    dispatch({
                        type: SET_CURRENT_QUESTION,
                        currentQuestion: currentQuestion + 1,
                    });
                    return;
                }

                dispatch({ type: SET_SHOW_RESULTS, showResults: true });
            };
            // function for results to show at the end of the quiz. Also to render and give the buttons within the app functionality
            if (showResults) {
                return (
                    <div className="container results">
                        <h2>Results</h2>
                        <ul>{renderResultsData()}</ul>
                        <button className="btn btn-primary" onClick={restart}>
                            Restart
                        </button>
                    </div>
                );
            } else {
                return (
                    <QuizContext.Provider value={{ state, dispatch }}>
                        <div className="container">
                            <Progress
                                total={questions.length}
                                current={currentQuestion + 1}
                            />
                            <Question />
                            {renderError()}
                            <Answers />
                            <button className="btn btn-primary" onClick={next}>
                                Confirm and Continue
                            </button>
                        </div>
                    </QuizContext.Provider>
                );
            }
        }

        export default App;