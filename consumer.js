// consumer.js
const amqp = require('amqplib');

async function receive() {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'hello';

    await channel.assertQueue(queue);
    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, (msg) => {
        console.log(`[x] Received '${msg.content.toString()}'`);
    }, {
        noAck: true
    });
}

receive();
