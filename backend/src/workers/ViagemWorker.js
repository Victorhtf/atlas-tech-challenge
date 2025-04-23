import { getChannel } from '../utils/rabbitmq.js';

export class ViagemWorker  {
  constructor(queueName = 'viagens_criadas') {
    this.queue = queueName;
    this.isRunning = false;
  }

  async start() {
    try {
      console.log('[WorkerViagem] Tentando iniciar o worker...');

      this.channel = await getChannel();

      await this.channel.assertExchange('viagens', 'direct', { durable: true });
      await this.channel.assertQueue(this.queue, { durable: true });
      await this.channel.bindQueue(this.queue, 'viagens', 'viagem.criada');


      console.log(`[WorkerViagem] Worker iniciado. Consumindo a fila: ${this.queue}`);
      this.isRunning = true;

      this.channel.consume(this.queue, (msg) => {
        if (msg) {
          const dados = JSON.parse(msg.content.toString());
          this.processarMensagem(dados);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error(`[WorkerViagem] Erro ao iniciar: ${error.message}`);
      this.isRunning = false;
    }
  }

  processarMensagem(dadosViagem) {
    console.log(
      `Notificação: Viagem criada para ${dadosViagem.destino} com o motorista ${dadosViagem.motorista}`
    );
  }

  stop() {
    if (this.isRunning && this.channel) {
      this.channel.close();
      console.log('[WorkerViagem] Worker parado com sucesso.');
      this.isRunning = false;
    } else {
      console.log('[WorkerViagem] O worker não estava em execução.');
    }
  }
}
