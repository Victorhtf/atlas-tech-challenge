import Veiculo from '../models/Veiculo.js';
import mongoose from 'mongoose';
import { redisClient } from '../utils/redis.js'; 

const cacheVeiculos = async () => {
  const redis = await redisClient.getClient();
  const cacheData = await redis.get('veiculos');

  if (cacheData) {
    console.log('cacheFound')
    return JSON.parse(cacheData); 
  }
  
  const veiculos = await Veiculo.find();
  
  await redis.set('veiculos', JSON.stringify(veiculos), { EX: 3600 });

  return veiculos;
};

export const criarVeiculo = async (req, res) => {
  try {
    const veiculo = new Veiculo(req.body);
    const salvo = await veiculo.save()

    const redis = await redisClient.getClient();
    await redis.del('veiculos');

    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const listarVeiculos = async (req, res) => {
  try {
    const { id } = req.query; 
    let veiculos;

    if (id) {  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID inválido' });
      }
      const veiculo = await Veiculo.findById(id); 
      if (!veiculo) {
        return res.status(404).json({ error: 'Veículo não encontrado' });
      }
      return res.json([veiculo]); 
    }

    veiculos = await cacheVeiculos();
    res.json(veiculos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletarVeiculo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const veiculoDeletado = await Veiculo.findByIdAndDelete(id);

    if (!veiculoDeletado) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    const redis = await redisClient.getClient();
    await redis.del('veiculos'); 

    res.json({ mensagem: 'Veículo deletado com sucesso', veiculo: veiculoDeletado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
