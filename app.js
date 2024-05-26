const amqp = require('amqplib');

async function main() {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare a queue
    const queueName = 'hello';
    await channel.assertQueue(queueName, { durable: false });

    // Send a message to the queue
    const message = 'Hello, RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Sent message: ${message}`);

    // Close the connection
    setTimeout(() => {
      connection.close();
      process.exit(0);
    }, 500);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
