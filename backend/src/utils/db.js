import mongoose from 'mongoose';
import 'dotenv/config';

export class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) return mongoose;

    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.isConnected = true;
      console.log('Conectado ao MongoDB');
      return mongoose;
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error.message);
      process.exit(1);
    }
  }
}
