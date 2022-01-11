import Questions from "../Helper/Router"
import questionController from "../Controller/QuestionsController";
import questionRepository from "../Infrastructures/Repositories/QuestionRepository";
import {QuestionModel} from "../Infrastructures/Mongo-Model/questionModel";

const questionRepo = new questionRepository(QuestionModel)
const questionControllers = new questionController(questionRepo)
Questions.get("/getQuestions/Category/:name/QuestionId/:id", (req, res) => {
    const params = req.params

    res.send(`gelen soru id : ${params.id} gelen kategory ${params.name} `)
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