import questionApi from "./Api/QuestionApi";
import examApi from "./Api/ExamApi";


export const routerModule = () => {
    const imports = [
        questionApi,
        examApi
    ]
    return imports
}



