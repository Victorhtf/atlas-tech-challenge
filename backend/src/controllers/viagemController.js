import Viagem from '../models/Viagem.js';
import { getChannel } from '../utils/rabbitmq.js';
import mongoose from 'mongoose';
import { WorkerManager } from '../workers/index.js';


export const criarViagem = async (req, res) => {
  try {
    const viagem = new Viagem(req.body);
    const salvo = await viagem.save();

    const channel = await getChannel();
    const exchange = 'viagens';
    const routingKey = 'viagem.criada';

    await channel.assertExchange(exchange, 'direct', { durable: true });

    const msgBuffer = Buffer.from(JSON.stringify(salvo));
    channel.publish(exchange, routingKey, msgBuffer);

    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listarViagens = async (req, res) => {
  try {
    const { motorista, veiculo, id } = req.query; 
    let viagens;
    
    if (id) {
      try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'ID inválido' });
        }
        
        const viagem = await Viagem.findById(id)
          .populate('motorista')
          .populate('veiculo');
          
        if (!viagem) {
          return res.status(404).json({ error: 'Viagem não encontrada' });
        }
        
        return res.json([viagem]);
      } catch (idError) {
        return res.status(400).json({ error: idError.message });
      }
    }
    
    let filtro = {};
    
    if (motorista) filtro.motorista = motorista;
    if (veiculo) filtro.veiculo = veiculo;
    
    viagens = await Viagem.find(filtro)
      .populate('motorista') 
      .populate('veiculo');
    
    res.json(viagens); 
  } catch (err) {
    res.status(400).json({ error: err.message }); 
  }
};

export const deletarViagem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const viagemRemovida = await Viagem.findByIdAndDelete(id);

    if (!viagemRemovida) {
      return res.status(404).json({ error: 'Viagem não encontrada' });
    }

    res.status(200).json({ mensagem: 'Viagem deletada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
