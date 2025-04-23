import express from 'express';
import { criarMotoristas, listarMotoristas, deletarMotorista } from '../controllers/motoristaController.js';

const router = express.Router();

router.post('/', criarMotoristas);
router.get('/', listarMotoristas);
router.delete('/:id', deletarMotorista)

export default router;
