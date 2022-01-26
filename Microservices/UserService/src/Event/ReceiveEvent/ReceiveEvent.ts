import amqp, {Channel, Connection} from "amqplib/callback_api";

class EvenController{
    constructor(
        public connection:Connection,
        public channel:Channel
    ) {
        this.Allconsumer()
    }
    Allconsumer(){

        this.connection.createChannel((err, channel)=>{

        })
        this.connection.createChannel((err, channel)=>{

        })
    }
    receiveQuestionEvent(){
        this.connection.createChannel((err, channel)=>{
            if(err){

            }
            const QUEUE = "QuestionEvent"
            channel.assertQueue(QUEUE)
            channel.consume(QUEUE,(msg)=>{

            })
        })
    }
    publisher(){

    }
}

    amqp.connect('amqp://localhost',(err,connection)=>{

        if(err){
            throw err
        }
        connection.createChannel((err, channel)=>{
            if (err){

            }
            channel.assertQueue("")

        })

    })

function consumer(channel:Channel){
        channel.assertQueue()
}




// export async function deneme() {
//     const conn = await amqpClient()
//     const channel = await conn.createChannel()
//     const QUEUE = 'UserQuestionEvent'
//     const assertion = await channel.assertQueue(QUEUE)
//     return new Promise<string>((resolve, reject) => {
//         channel.consume(QUEUE, (msg) => {
//             if (msg !== null) {
//                 const ReceiveData = msg.content.toString()
//
//                 channel.ack(msg);
//                 resolve(ReceiveData)
//             }
//         })
//     })
//
// }

// amqpClient.then(function(conn) {
//     return conn.createChannel();
// }).then(function(ch) {
//     const QUEUE = 'UserQuestionEvent'
//     return ch.assertQueue(QUEUE).then(function(ok) {
//         return ch.consume(QUEUE, function(msg) {
//             if (msg !== null) {
//                 console.log(msg.content.toString());
//                 const ReceiveData = msg.content.toString()
//
//                 ch.ack(msg);
//                 return ReceiveData
//             }
//         });
//     });
// }).catch(console.warn);



