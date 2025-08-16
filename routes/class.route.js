import express from 'express';
const router = express.Router();
import { classEntry } from '../controllers/class.controller.js';
// import studentAuthorization from '../middlewares/studentAuthorizan.js';
import crAuthorizan from '../middlewares/crAuthorizan.js';

router.post('/new',crAuthorizan,classEntry);


export default router;