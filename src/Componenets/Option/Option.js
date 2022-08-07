import React, { useState } from 'react'
import './Option.css'


function Option({ index, item, selectOption, handleClick, selected, correctAnswerIndex }) {


    return (<>
        <div className={
            correctAnswerIndex ? "correctAnswer" : selected ? 'selected' : "option"
        }
            onClick={() => {
                selectOption(index)
                handleClick(index)
            }}
            key={index}
        ><p>{item}</p>
        </div>

    </>
    )
}

export default Option