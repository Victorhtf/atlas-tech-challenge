import Veiculo from '../models/Veiculo.js';

const veiculos = [
  {
    modelo: 'Mercedes Actros',
    placa: 'ABC1D23',
    tipo: 'Caminhão',
    capacidade: 10000
  },
  {
    modelo: 'Fiat Ducato',
    placa: 'XYZ9H87',
    tipo: 'Van',
    capacidade: 2000
  },
  {
    modelo: 'Volkswagen Delivery',
    placa: 'DEF4G56',
    tipo: 'Caminhão',
    capacidade: 8000
  }
];

async function seedVeiculos() {
  try {
    await Veiculo.deleteMany();
    const result = await Veiculo.insertMany(veiculos);
    console.log(`${result.length} veículos inseridos`);
  } catch (error) {
    console.error('Erro ao fazer seed de veículos:', error);
    process.exit(1);
  }
};

export default seedVeiculos;
