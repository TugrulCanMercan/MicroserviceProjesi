import {QuestionModelI} from "../../Core/Model/RequestModel/QuestionModel";
import Repository from "./Repository";


export default class QuestionRepository extends Repository<QuestionModelI>{

    getAllQuestion(){
        // this._model.find().where('_id').in
    }
}





//
// export default class questionRepository{
//
//     constructor() {
//     }
//
//     async addQuestion(question:QuestionModelI){
//             await question.save()
//
//     }
//
// }

// return new Promise<string>((resolve,reject)=>{
//     user.save().then(()=>{
//         console.log("kayıt başarıyla tamamlandı")
//         resolve("kayıt başarıyla tamamlandı")
//     })
//         .catch(()=>{
//             console.log("kayıt başarısız")
//             reject("kayıt başarısız")
//         });
// })