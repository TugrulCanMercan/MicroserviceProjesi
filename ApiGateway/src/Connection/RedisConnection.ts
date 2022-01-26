import redis from "redis";

const client = redis.createClient({url:'redis://tugrul@redis:6379'});


client.on("error", function(error) {
    if (error){

        console.log(error)
    }else{
        console.log("başarılı")
    }

});


client.get("user",(err,message)=>{
    console.log(message)
})
export default client