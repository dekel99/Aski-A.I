const qna = require("@tensorflow-models/qna")
require('@tensorflow/tfjs-node');

async function modelInit() {
    const model = await qna.load()
    console.log("model loaded")
    return model
}

module.exports(modelInit)