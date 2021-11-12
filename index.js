const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')
const qna = require("@tensorflow-models/qna")
require('@tensorflow/tfjs-node');
// const modelInit = require("./functions/modelInit")
const { default: WikiJS } = require("wikijs")
require("dotenv").config()

const app = express();
let model

async function modelInit() {
    model = await qna.load()
    console.log("model loaded")
}

modelInit()

app.use(bodyParser.json())
app.use(cors({ origin: process.env.REACT_APP_FRONT_URL, credentials: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.post("/", async function(req, res){
    const {searchInput, question} = req.body
    const page = await WikiJS().page(`${searchInput}`)
    const content = await page.rawContent()
    console.log("model start")
    const answersRes = await model.findAnswers(question, content)
    console.log("model finish")

    res.status(200).json({answersRes})
})

// Port Config **
let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}

app.listen(port, function() {
  console.log(`server started running on port: ${port}`);
}); 