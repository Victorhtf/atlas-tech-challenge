import Motorista from '../models/Motorista.js';

export const validarCNH = async (req, res, next) => {
  try {
    const { motorista: motoristaId } = req.body;

    const motorista = await Motorista.findById(motoristaId);
    if (!motorista) return res.status(404).json({ error: 'Motorista não encontrado' });

    const hoje = new Date();
    if (motorista.cnh.validade < hoje) {
      return res.status(400).json({ error: 'CNH vencida. Não é possível criar a viagem.' });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao validar CNH' });
  }
};
