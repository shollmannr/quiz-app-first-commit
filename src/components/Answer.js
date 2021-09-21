import React from 'react';
import { SET_CURRENT_ANSWER, SET_ERROR } from '../reducers/types.js';
// code/function for the selected answer on the app
function Answer(props) {
    let classes = ['answer'];
    // handles the click on the answer yo pick
    const handleClick = e => {
        props.dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: e.target.value,
        });
        props.dispatch({ type: SET_ERROR, error: '' });
    };
    // handles/pushes the selection of the answer
    if (props.selected) {
        classes.push('selected');
    }
    return (
        <button
            value={props.letter}
            className={classes.join(' ')}
            onClick={handleClick}>
            <span className="letter">{props.letter}.</span> {props.answer}
        </button>
    );
}

export default Answer;