const { Kafka } = require('kafkajs');

// Define Kafka broker and topic
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Update with your Kafka broker address
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'connect-test', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
