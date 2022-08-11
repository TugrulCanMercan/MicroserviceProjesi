import Questions from "../Helper/Router"
import questionController from "../Controller/QuestionsController";
import questionRepository from "../Infrastructures/Repositories/QuestionRepository";
import {QuestionModel} from "../Infrastructures/Mongo-Model/questionModel";

const questionRepo = new questionRepository(QuestionModel)
const questionControllers = new questionController(questionRepo)

Questions.get("/getAllQuestions", (req, res) => {
    questionControllers.getAllQuestions(req).then((result)=>{
        res.send(result)
    })
})
Questions.post("/getAllQuestionsExam", (req, res) => {
    questionControllers.getAllQuestionsExam(req).then((result)=>{
        res.send({examId:req.body.examId,questions:result})
    })
})

Questions.post('/addQuestions', async (req, res) => {

    questionControllers.createQuestions(req).then((result) => {
        res.send(result)
    })
})
Questions.post('/questionAddLibrary', (req, res) => {
    questionControllers.questionAddLibrary(req).then((result) => {
        res.send(result)
    })
})


export default Questions