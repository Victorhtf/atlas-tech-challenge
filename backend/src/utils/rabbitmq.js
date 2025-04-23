import amqp from 'amqplib';
import dotenv from 'dotenv';

let channel = null;
dotenv.config()

const USER = process.env.RABBITMQ_DEFAULT_USER
const PASS = process.env.RABBITMQ_DEFAULT_PASS

export const getChannel = async () => {
  if (channel) return channel;

  try {
    const connection = await amqp.connect(`amqp://${USER}:${PASS}@localhost:5672`);
    channel = await connection.createChannel();
    console.log('[RabbitMQ] Conexão estabelecida com sucesso!');
    return channel;
  } catch (err) {
    console.error('[RabbitMQ] Erro ao estabelecer conexão', err);
    throw err;
  }
};
