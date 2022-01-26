import mongoose from 'mongoose';
import userApi from "../../Api/UserApi";


export default () => {
    // mongodb://admin:password@mongoUser:27018/

    // mongoose.connect("mongodb://admin:password@localhost:27017/")
    mongoose.connect("mongodb://admin:password@mongouserdb:27018/")
    mongoose.connection
        .once('open', () => console.log("bağlantı başarılı"))
        .on("error", (error) => {
            console.log(error);
        })
}