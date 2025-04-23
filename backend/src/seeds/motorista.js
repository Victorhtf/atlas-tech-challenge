import Motorista from '../models/Motorista.js';

const motoristas = [
  {
    nome: 'João Silva',
    cpf: '11122233344',
    cnh: {
      numero: 'CNH001',
      validade: new Date('2026-12-01')
    }
  },
  {
    nome: 'Maria Oliveira',
    cpf: '55566677788',
    cnh: {
      numero: 'CNH002',
      validade: new Date('2025-10-15')
    }
  },
  {
    nome: 'Carlos Mendes',
    cpf: '99988877766',
    cnh: {
      numero: 'CNH003',
      validade: new Date('2027-04-30')
    }
  }
];

async function seedMotoristas() {
  try {
    await Motorista.deleteMany();
    const result = await Motorista.insertMany(motoristas);
    console.log(`${result.length} motoristas inseridos`);
  } catch (error) {
    console.error('Erro ao fazer seed de motoristsa:', error);
    process.exit(1);
  }
};

export default seedMotoristas;
