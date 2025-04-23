import request from 'supertest';
import { app } from '../server';
import mongoose from 'mongoose';
import Veiculo from '../models/Veiculo';

describe('Veiculo Controller', () => {
  const mockVeiculos = [
    {
      _id: new mongoose.Types.ObjectId('68068699c1657d6e8aee044e'),
      modelo: "Mercedes Actros",
      placa: "ABC1D23",
      tipo: "Caminhão",
      capacidade: 10000,
      createdAt: new Date("2025-04-21T17:55:37.538Z"),
      updatedAt: new Date("2025-04-21T17:55:37.538Z"),
      __v: 0,
    },
    {
      _id: new mongoose.Types.ObjectId('68068699c1657d6e8aee044f'),
      modelo: "Fiat Ducato",
      placa: "XYZ9H87",
      tipo: "Van",
      capacidade: 2000,
      createdAt: new Date("2025-04-21T17:55:37.539Z"),
      updatedAt: new Date("2025-04-21T17:55:37.539Z"),
      __v: 0,
    },
    {
      _id: new mongoose.Types.ObjectId('68068699c1657d6e8aee0450'),
      modelo: "Volkswagen Delivery",
      placa: "DEF4G56",
      tipo: "Caminhão",
      capacidade: 8000,
      createdAt: new Date("2025-04-21T17:55:37.539Z"),
      updatedAt: new Date("2025-04-21T17:55:37.539Z"),
      __v: 0,
    },
  ];

  beforeEach(async () => {
    await Veiculo.deleteMany({});
    await Veiculo.insertMany(mockVeiculos);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /veiculos', () => {
    it('deve retornar todos os veículos cadastrados', async () => {
      const res = await request(app).get('/veiculos');
      
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(mockVeiculos.length);
      expect(res.body[0]).toHaveProperty('modelo', 'Mercedes Actros');
      expect(res.body[0]).toHaveProperty('placa', 'ABC1D23');
      expect(res.body[0]).toHaveProperty('tipo', 'Caminhão');
      expect(res.body[0]).toHaveProperty('capacidade', 10000);
    });
  });

  describe('POST /veiculos', () => {
    it('deve criar um novo veículo e retornar os dados criados corretamente', async () => {
      const newVeiculo = {
        modelo: "Mercedes Lotus",
        placa: "ZYB9920",
        tipo: "Caminhão",
        capacidade: 10000,
      };

      const res = await request(app)
        .post('/veiculos')
        .send(newVeiculo)
        .expect(201);

      expect(res.body).toMatchObject({
        modelo: "Mercedes Lotus",
        placa: "ZYB9920",
        tipo: "Caminhão",
        capacidade: 10000,
      });

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('createdAt');
      expect(res.body).toHaveProperty('updatedAt');
      expect(res.body.__v).toBe(0);
    });
  });
});
