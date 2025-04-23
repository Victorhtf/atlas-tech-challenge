const { exec } = require('child_process');
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Veiculo = require('../models/Veiculo');
const Motorista = require('../models/Motorista');
const Viagem = require('../models/Viagem');

describe('Viagem Controller', () => {
  let veiculoId;
  let motoristaId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  beforeEach(async () => {
    await Veiculo.deleteMany({});
    await Motorista.deleteMany({});
    await Viagem.deleteMany({});
    
    const motorista = await Motorista.create({
      nome: 'João Silva',
      cpf: '11122233344',
      cnh: {
        numero: 'CNH001',
        validade: '2026-12-01T00:00:00.000Z',
      },
    });

    const veiculo = await Veiculo.create({
      modelo: 'Mercedes Actros',
      placa: 'ABC1D23',
      tipo: 'Caminhão',
      capacidade: 10000,
    });

    motoristaId = motorista._id;
    veiculoId = veiculo._id;
  });

  afterEach(async () => {
    await Veiculo.deleteMany({});
    await Motorista.deleteMany({});
    await Viagem.deleteMany({});
    
    await new Promise((resolve, reject) => {
      exec('npm run seed', (error, stdout, stderr) => {
        if (error) {
          reject(`Exec error: ${error}`);
          return;
        }
        console.log(stdout);
        resolve();
      });
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('deve criar uma nova viagem', async () => {
    const novaViagem = {
      origem: 'São Paulo',
      destino: 'Rio de Janeiro',
      dataPartida: '2025-04-15T08:00:00.000Z',
      previsaoChegada: '2025-04-15T18:00:00.000Z',
      motorista: motoristaId,
      veiculo: veiculoId,
    };

    const res = await request(app)
      .post('/viagens')
      .send(novaViagem)
      .expect(201);

    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('origem', 'São Paulo');
    expect(res.body).toHaveProperty('destino', 'Rio de Janeiro');
    expect(res.body).toHaveProperty('status', 'Planejada');
    expect(res.body.motorista).toHaveProperty('_id', motoristaId.toString());
    expect(res.body.veiculo).toHaveProperty('_id', veiculoId.toString());
  });

  it('deve listar todas as viagens', async () => {
    await Viagem.create({
      origem: 'São Paulo',
      destino: 'Rio de Janeiro',
      dataPartida: '2025-04-15T08:00:00.000Z',
      previsaoChegada: '2025-04-15T18:00:00.000Z',
      motorista: motoristaId,
      veiculo: veiculoId,
      status: 'Planejada',
    });

    const res = await request(app).get('/viagens').expect(200);

    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('origem', 'São Paulo');
    expect(res.body[0]).toHaveProperty('destino', 'Rio de Janeiro');
    expect(res.body[0]).toHaveProperty('status', 'Planejada');
    expect(res.body[0].motorista).toHaveProperty('_id', motoristaId.toString());
    expect(res.body[0].veiculo).toHaveProperty('_id', veiculoId.toString());
  });
});
