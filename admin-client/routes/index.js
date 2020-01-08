let express = require("express");
let router = express.Router();
const signTxn = require("./signTx");
const keys = require("./keys");

router.post("/submit", async function (req, res, next) {
  try {
    console.log("INSIDE SERVER SUBMIT");
    data = req.body;
    const studId = parseInt(data.studId),
      quizId = parseInt(data.quizId),
      methodCall = await quiz.methods.setSubmit(studId, quizId);
    signTxn.sendTransaction(
      methodCall,
      keys.publicKey,
      keys.privateKey,
      response => {
        response ? res.json(response) : res.json(response);
      }
    );
  } catch (error) {
    console.log("TCL: error", error);
  }
});
router.post("/admin", async function (req, res, next) {
  try {
    console.log("INSIDE SERVER ADMIN");
    data = req.body;
    const ans = data.ans,
      studId = parseInt(data.studId),
      quizId = parseInt(data.quizId);
    const answ = await quiz.methods.getAnswers(quizId, 0).call({ from: keys.publicKey }),
      answer = JSON.parse(answ),
      length = answer.length;
    let score = 0;
    for (let i = 0; i < length; i++) {
      let a = answer[i].split(",");
      if (ans[JSON.stringify(i + 1)] === a[1]) {
        score++;
      }
    }
    console.log("TCL: score", score);
    methodCall = await quiz.methods.setScore(quizId, studId, score);
    signTxn.sendTransaction(
      methodCall,
      keys.publicKey,
      keys.privateKey,
      response => {
        response ? res.json(response) : res.json(response);
      }
    );
  } catch (error) {
    console.log("TCL: error", error);
  }
});
 router.post("/getQuiz", async function(req,res,next){
   try {
     console.log("INSIDE GET");
     data = req.body;
     const quizId = parseInt(data.quizId);
    const ques = await this.quiz.methods.getQuiz(0,quizId).call({ from: keys.publicKey });
    res.json(ques);
   } catch (error) {
   console.log("TCL: error", error)
     
   }
 })

module.exports = router;
