import '@tensorflow/tfjs-backend-webgl';
import wiki from 'wikijs';
import axios from "axios"
import { useEffect, useState } from 'react';
import SearchInput from './SearchInput';
import QuestionInput from './QuestionInput';
import Alert from '@mui/material/Alert';
import animateBG from "../functions/backgroundAnimation"
import LoadingButton from '@mui/lab/LoadingButton';
import ResultContainer from './ResultContainer';
import '../styles/App.scss';
import HowToUse from './HowToUse';

function App() {
  const [searchInput, setSearchInput] = useState()
  const [question, setQuestion] = useState()
  const [answers, setAnswers] = useState()
  const [dataFoundMessage, setDataFoundMessage] = useState()
  const [summery, setSummery] = useState()
  const [isDataFound, setIsDataFound] = useState()
  const [searchBtnLoading, setSearchBtnLoading] = useState(false)
  const [askBtnLoading, setAskBtnLoading] = useState(false)

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value)
  }

  function handleQuestionInputChange(e) {
    setQuestion(e.target.value)
  }
  
  async function getAnswer() {
    try{
      setAskBtnLoading(true)
      const data = {searchInput, question}
      const res = await axios({method: "POST", url: "http://localhost:4000", withCredentials: true, data})
      const { answersRes } = res.data
      setAnswers(answersRes)
    } catch (err) {
      console.log(err)
    }
    setAskBtnLoading(false)
  }

  async function fetchWikiData() {
    try{
      if (!searchInput) throw "Input is empty"
      setSearchBtnLoading(true)
      setAnswers()
      const page = await wiki().page(`${searchInput}`)
      const summeryResult = await page.summary()
      console.log(page)
      setDataFoundMessage(`Data on ${page.title} found you may ask a question`)
      setSummery(summeryResult)
      setIsDataFound(true)
    } catch(err) {
      console.log("Error while tried to fetch data:", err)
      setDataFoundMessage("Data on your search term not found")
      setIsDataFound(false)
    }
    setSearchBtnLoading(false)
  }

  useEffect(() => {
    animateBG()
  }, [])

  return (
    <div className="app-container">
      <div className="container hero">
      	<div className="inner">
      		<h1>Ask A.I.</h1>
          <SearchInput handleSearchInputChange={handleSearchInputChange} fetchWikiData={fetchWikiData} searchBtnLoading={searchBtnLoading}/>
          {dataFoundMessage && <Alert variant="outlined" severity={isDataFound ? "success" : "error"}>{dataFoundMessage}</Alert>}
          {isDataFound && 
            <div style={{marginTop: "10px"}}>
              <QuestionInput handleQuestionInputChange={handleQuestionInputChange} />
              <LoadingButton loading={askBtnLoading} onClick={getAnswer} variant="contained">Ask A.I</LoadingButton>
              {answers &&
                <ResultContainer summery={summery} answers={answers} />}
            </div>}
          <HowToUse />
      	</div>
      	<div className="overlay"></div>
      	<div className="background">
      		<canvas id="hero-canvas" width="1920" height="1080"></canvas>
      	</div>
      </div>
      <p className="small by-text">by: Dekel Luski</p>
    </div>
  )
}

export default App;
