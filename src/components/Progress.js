import React from 'react';
// function for your progress of the questions/app
function Progress(props) {
    return (
        <h2>
            Question {props.current} of {props.total}
        </h2>
    );
}

export default Progress;