import { Router } from "express";
import { salvar, listarTodos, buscarPorMarca, buscarPorId, alterar, remover } from "../repository/carroRepository.js";
const endpoints = Router();

endpoints.post('/carros', async (req, resp) =>{
    let carro = req.body;

    let r = await salvar(carro);

    resp.send(r);
})

endpoints.get('/carros', async (req, resp) => {

    let r = await listarTodos();
    
    resp.send(r);
})

endpoints.get('/carros/busca', async (req, resp) => {
    let marca = req.query.marca;
    let r = await buscarPorMarca(marca);
    resp.send(r);
})

endpoints.get('/carros/:id', async (req, resp) => {
    let id = req.params.id;
    let r = await buscarPorId(id);

    if (r == null)
    resp.status(404).send();
    else
    resp.send(r);
})

endpoints.put('/carros/:id', async (req, resp) => {
    let id = req.params.id;
    let carro = req.body;

    let r = await alterar(id, carro);

    if(r == 0){
        resp.status(404).send();}
    else{
    resp.status(202).send();
    }
})

endpoints.delete('/carros/:id', async (req , resp) => {
    let id = req.params.id;


    let r = await remover(id);

    if(r == 0){
        resp.status(404).send();}
    else{
    resp.status(202).send();}

})



export default endpoints;