// producer.js
const amqp = require('amqplib');

async function send() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'hello';
    const message = 'Hello, RabbitMQ!';

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`[x] Sent '${message}'`);

}

send();
