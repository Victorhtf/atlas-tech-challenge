import express from 'express';
import { criarViagem, listarViagens, deletarViagem } from '../controllers/viagemController.js';
import { validarCNH } from '../middlewares/validarCNH.js';

const router = express.Router();

router.post('/', validarCNH, criarViagem);
router.get('/', listarViagens);
router.delete('/:id', deletarViagem);

export default router;
