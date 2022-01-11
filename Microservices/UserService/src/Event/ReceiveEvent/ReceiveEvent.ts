



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



