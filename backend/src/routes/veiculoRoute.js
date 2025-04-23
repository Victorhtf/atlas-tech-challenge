import express from 'express';
import { criarVeiculo, deletarVeiculo, listarVeiculos } from '../controllers/veiculoController.js';

const router = express.Router();

router.post('/', criarVeiculo); 
router.get('/', listarVeiculos);
router.delete('/:id', deletarVeiculo)

export default router;
