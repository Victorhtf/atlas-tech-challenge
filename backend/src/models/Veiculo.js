import mongoose from 'mongoose';

const VeiculoSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
  },
  placa: {
    type: String,
    required: true,
    unique: true,
    match: /^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/,
  },
  tipo: {
    type: String,
    enum: ['Caminhão', 'Van', 'Ônibus', 'Carro', 'Motocicleta', 'Caminhonete', 'Outro'],
    required: true,
  },
  capacidade: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Veiculo = mongoose.model('Veiculo', VeiculoSchema);
export default Veiculo;
