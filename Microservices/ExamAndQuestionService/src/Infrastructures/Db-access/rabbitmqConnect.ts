import amqplib from "amqplib";

const client =  amqplib.connect('amqp://localhost')


export default client