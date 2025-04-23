import { Database } from '../utils/db.js';
import seedMotoristas from './motorista.js';
import seedVeiculos from './veiculo.js';
import seedViagens from './viagem.js';

const seedAll = async () => {
  try {
    const db = new Database();
    await db.connect();

    await seedMotoristas();
    await seedVeiculos();
    await seedViagens();

    console.log('Seeds executadas com sucesso');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao rodar as seeds:', error);
    process.exit(1);
  }
};

seedAll();
