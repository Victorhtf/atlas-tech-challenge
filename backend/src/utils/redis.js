import { createClient } from 'redis';

class RedisClient {
  static instance = null;
  client = null;

  constructor() {
    if (RedisClient.instance) {
      return RedisClient.instance;
    }

    RedisClient.instance = this;
  }

  async connect() {
    if (this.client && this.client.isOpen) {
      return;
    }

    this.client = createClient();

    this.client.on('connect', () => {
      console.log('[Redis] Conexão estabelecida com sucesso!');
    });

    this.client.on('error', (err) => {
      console.error('[Redis] Erro ao iniciar conexão', err);
    });

    this.client.on('end', () => {
      console.log('[Redis] Conexão fechada');
    });

    await this.client.connect();
  }

  async getClient() {
    if (!this.client || !this.client.isOpen) {
      await this.connect();
    }
    return this.client;
  }
}

export const redisClient = new RedisClient();
