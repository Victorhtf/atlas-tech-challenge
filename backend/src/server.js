import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { Database } from './utils/db.js';
import { ViagemWorker } from './workers/ViagemWorker.js';
import { WorkerManager } from './workers/index.js';

import motoristasRoutes from './routes/motoristaRoute.js';
import veiculosRoutes from './routes/veiculoRoute.js';
import viagensRoutes from './routes/viagemRoute.js';

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export class App {
  constructor() {
    this.app = express();
    this.WorkerManager = new WorkerManager();
    this.db = new Database();
    this.configureApp();
  }

  configureApp() {
    console.log('Configurando app...');
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.setupRoutes();
  }

  setupRoutes() {
    console.log('Configurando rotas...');
    this.app.use('/motoristas', motoristasRoutes);
    this.app.use('/veiculos', veiculosRoutes);
    this.app.use('/viagens', viagensRoutes);
  }

  async start() {
    console.log('Iniciando aplicação...');
    try {
      await this.db.connect();
      this.WorkerManager.registrarWorkers([ViagemWorker]);
      await this.WorkerManager.iniciarTodos();
      
      const PORT = process.env.PORT || 3001;
      this.app.listen(PORT, () => {
        console.log(`Backend rodando na porta ${PORT}`);
      });
    } catch (err) {
      console.error('Erro ao iniciar o servidor:', err);
      process.exit(1);
    }
  }
}

const app = new App();
app.start();
