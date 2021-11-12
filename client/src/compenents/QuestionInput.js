import React from 'react'
import TextField from '@mui/material/TextField';
import "../styles/QuestionInput.css"

function QuestionInput({ handleQuestionInputChange }) {
  return (
    <div className="input-container">
      <TextField onChange={handleQuestionInputChange} label="Question" size="small"/>
      {/* <label htmlFor="question">question </label>
      <input className="inputs" id="question" type="text" onChange={handleQuestionInputChange}></input> */}
    </div>
  )
}

export default QuestionInput
