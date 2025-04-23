import mongoose from 'mongoose';

const ViagemSchema = new mongoose.Schema({
  origem: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  dataPartida: {
    type: Date,
    required: true,
  },
  previsaoChegada: {
    type: Date,
    required: true,
  },
  motorista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Motorista',
    required: true,
  },
  veiculo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veiculo',
    required: true,
  },
  status: {
    type: String,
    enum: ['Planejada', 'Em andamento', 'Concluída', 'Cancelada'],
    default: 'Planejada',
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

const Viagem = mongoose.model('Viagem', ViagemSchema);
export default Viagem;
