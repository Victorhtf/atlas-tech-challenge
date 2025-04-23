import request from 'supertest';
import { app } from '../server';
import mongoose from 'mongoose';
import Viagem from '../models/Viagem';
import Motorista from '../models/Motorista';
import Veiculo from '../models/Veiculo';

describe('Viagem Controller', () => {
  let motoristaId;
  let veiculoId;

  const mockMotorista = {
    _id: new mongoose.Types.ObjectId('67ffec46ec923abb1ca53cbc'),
    nome: "João Silva",
    cpf: "11122233344",
    cnh: {
      numero: "CNH001",
      validade: new Date("2026-12-01T00:00:00.000Z"),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockVeiculo = {
    _id: new mongoose.Types.ObjectId('68068699c1657d6e8aee044e'),
    modelo: "Mercedes Actros",
    placa: "ABC1D23",
    tipo: "Caminhão",
    capacidade: 10000,
    createdAt: new Date("2025-04-21T17:55:37.538Z"),
    updatedAt: new Date("2025-04-21T17:55:37.538Z"),
    __v: 0,
  };

  beforeEach(async () => {
    await Motorista.deleteMany({});
    await Veiculo.deleteMany({});
    await Viagem.deleteMany({});

    const motorista = await Motorista.create(mockMotorista);
    motoristaId = motorista._id;

    const veiculo = await Veiculo.create(mockVeiculo);
    veiculoId = veiculo._id;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /viagens', () => {
    it('deve criar uma nova viagem', async () => {
      const viagem = {
        origem: "São Paulo",
        destino: "Rio de Janeiro",
        dataPartida: "2025-04-15T08:00:00.000Z",
        previsaoChegada: "2025-04-15T18:00:00.000Z",
        motorista: motoristaId.toString(),
        veiculo: veiculoId.toString(),
      };

      const res = await request(app)
        .post('/viagens')
        .send(viagem)
        .expect(201);

      expect(res.body).toHaveProperty('origem', 'São Paulo');
      expect(res.body).toHaveProperty('destino', 'Rio de Janeiro');
      expect(res.body).toHaveProperty('dataPartida', '2025-04-15T08:00:00.000Z');
      expect(res.body).toHaveProperty('previsaoChegada', '2025-04-15T18:00:00.000Z');
      expect(res.body).toHaveProperty('motorista');
      expect(res.body).toHaveProperty('veiculo');
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('status', 'Planejada');
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('updatedAt');
      expect(res.body.__v).toBe(0);
    });
  });

  describe('GET /viagens', () => {
    it('deve listar todas as viagens', async () => {
      const viagem = {
        origem: "São Paulo",
        destino: "Rio de Janeiro",
        dataPartida: "2025-04-15T08:00:00.000Z",
        previsaoChegada: "2025-04-15T18:00:00.000Z",
        motorista: motoristaId.toString(),
        veiculo: veiculoId.toString(),
        status: "Planejada",
      };

      await Viagem.create(viagem);

      const res = await request(app).get('/viagens');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toHaveProperty('origem', 'São Paulo');
      expect(res.body[0]).toHaveProperty('destino', 'Rio de Janeiro');
      expect(res.body[0]).toHaveProperty('status', 'Planejada');
      expect(res.body[0]).toHaveProperty('motorista');
      expect(res.body[0]).toHaveProperty('veiculo');
    });
  });
});
