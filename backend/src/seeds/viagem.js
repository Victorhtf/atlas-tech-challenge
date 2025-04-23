import Viagem from '../models/Viagem.js';
import Motorista from '../models/Motorista.js';
import Veiculo from '../models/Veiculo.js';

async function seedViagens() {
  try {
    await Viagem.deleteMany();

    const motoristas = await Motorista.find();
    const veiculos = await Veiculo.find();

    if (motoristas.length < 2 || veiculos.length < 2) {
      throw new Error('É necessário pelo menos 2 motoristas e 2 veículos cadastrados.');
    }

    const viagens = [
      {
        origem: 'São Paulo',
        destino: 'Rio de Janeiro',
        dataPartida: new Date('2025-04-15T08:00:00Z'),
        previsaoChegada: new Date('2025-04-15T18:00:00Z'),
        motorista: motoristas[0]._id,
        veiculo: veiculos[0]._id,
        status: 'Planejada'
      },
      {
        origem: 'Campinas',
        destino: 'Curitiba',
        dataPartida: new Date('2025-04-20T07:30:00Z'),
        previsaoChegada: new Date('2025-04-20T15:45:00Z'),
        motorista: motoristas[1]._id,
        veiculo: veiculos[1]._id,
        status: 'Em andamento'
      }
    ];

    const result = await Viagem.insertMany(viagens);
    console.log(`${result.length} viagens inseridas`);
  } catch (error) {
    console.error('Erro ao fazer seed de viagens:', error);
    process.exit(1);
  }
};

export default seedViagens;
