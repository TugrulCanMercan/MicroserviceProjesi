import mongoose from 'mongoose';
import userApi from "../../Api/UserApi";


export default  () => {
    mongoose.connect("mongodb://admin:password@localhost:27017/")
    mongoose.connection
        .once('open',()=>console.log("bağlantı başarılı"))
        .on("error",(error)=>{
            console.log(error);
        })
}