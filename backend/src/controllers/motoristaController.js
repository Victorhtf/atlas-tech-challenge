import { redisClient } from '../utils/redis.js';
import Motorista from '../models/Motorista.js';
import mongoose from 'mongoose';

export const criarMotoristas = async (req, res) => {
  try {
    const novoMotorista = await Motorista.create(req.body);
    const redis = await redisClient.getClient();
    await redis.set(`motorista:${novoMotorista._id}`, JSON.stringify(novoMotorista), { EX: 3600 });
    res.status(201).json(novoMotorista);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const listarMotoristas = async (req, res) => {
  try {
    const { id } = req.query;
    let motoristas;

    if (id) {
      const redis = await redisClient.getClient();
      const cachedMotorista = await redis.get(`motorista:${id}`);

      if (cachedMotorista) {
        return res.json([JSON.parse(cachedMotorista)]);
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ erro: 'ID inválido' });
      }

      const motorista = await Motorista.findById(id);
      if (!motorista) {
        return res.status(404).json({ erro: 'Motorista não encontrado' });
      }

      await redis.set(`motorista:${id}`, JSON.stringify(motorista), { EX: 3600 });
      return res.json([motorista]);
    }

    motoristas = await Motorista.find();
    res.json(motoristas);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const deletarMotorista = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ erro: 'ID inválido' });
    }

    const motoristaDeletado = await Motorista.findByIdAndDelete(id);

    if (!motoristaDeletado) {
      return res.status(404).json({ erro: 'Motorista não encontrado' });
    }

    const redis = await redisClient.getClient();
    await redis.del(`motorista:${id}`);

    res.status(200).json({ mensagem: 'Motorista deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};
