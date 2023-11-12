import 'dotenv/config';
import express  from "express";
import  cors  from "cors";

import carroController from './controller/carroController.js';

const servidor = express();

servidor.use(cors());
servidor.use(express.json());

servidor.use(carroController);

servidor.listen(
    process.env.PORT, () => `Api subiu servidor na porta ${process.env.PORT}`);