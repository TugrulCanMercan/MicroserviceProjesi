import ExamApi from "../Helper/Router";
import ExamRepository from "../Infrastructures/Repositories/ExamRepository";
import ExamController from "../Controller/ExamController";
import ExamModel from "../Infrastructures/Mongo-Model/examModel";
import ExamResultModel from "../Infrastructures/Mongo-Model/ExamResultModel";
import ExamResultController from "../Controller/ExamResulController";
import ExamResultRepo from "../Infrastructures/Repositories/ExamResultRepo";

const examRepository = new ExamRepository(ExamModel)
const examResultRepository = new ExamResultRepo(ExamResultModel)
ExamApi.post("/createExam",async (req,res)=>{
    const examController = new ExamController(examRepository)
    await examController.createExam(req).then((result)=>{
        res.send(result)
    })
})
ExamApi.post("/postExamResultTurnIn",(req,res)=>{
    const examController = new ExamResultController(examResultRepository)
    examController.sendExamResult(req).then((result)=>{
        res.send("Kayıt bşarılı")
    })

})

ExamApi.post("/getExamId",async (req,res)=>{
    const examController = new ExamController(examRepository)
    examController.getExamById(req).then((val)=>{
        if (typeof val !== "undefined" && val.length > 0){
            res.send(val)
        }else{
            res.status(300).send({message:"sınav bulunamadı"})
        }

    })
})
export default ExamApi