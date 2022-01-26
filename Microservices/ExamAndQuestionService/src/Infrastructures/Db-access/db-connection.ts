
import mongoose from 'mongoose';


export default function dbConnection(){

    // mongoose.connect("mongodb://tugrul:mercan@mongo:27018/my-db?authSource=admin")
    // mongodb://admin:password@mongoExamAndQuestion:27017/
    mongoose.connect("mongodb://admin:password@mongoexamandquestiondb:27017/")
    // mongoose.connect("mongodb://admin:password@localhost:27017/")
    mongoose.connection
        .once('open',()=>console.log("bağlantı başarılı"))
        .on("error",(error)=>{
            console.log(error);
        })
}
