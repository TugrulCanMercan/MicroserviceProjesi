import amqplib from "amqplib/callback_api";

export default async ()=>{
    return new Promise<amqplib.Connection>((resolve,reject)=>{
        amqplib.connect('amqp://rabbit',(err,connection)=>{
            if(err){
                reject(err)
            }else {
                resolve(connection)
            }
        })
    })
}



// export default client