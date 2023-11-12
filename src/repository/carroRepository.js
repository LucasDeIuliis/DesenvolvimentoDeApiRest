import conexao from "./connection.js";

export async function salvar(carro) {
    let comando = `
    INSERT INTO tb_carros (nm_marca, ds_modelo, vl_avaliacao, dt_ano, bt_disponivel, img_carro) 
	VALUES (?, ?, ?, ?, ?, ?)`;

    let resp = await conexao.query(comando, [
        carro.marca,
        carro.modelo,
        carro.preco,
        carro.ano,
        carro.disponivel,
        carro.img_carro
    ]);

    let info = resp[0];

    return {
        id: info.insertId,
        ...carro
    };
}

export async function listarTodos() {
    let comando = `
        SELECT id_carro as id,
            nm_marca as marca,
            ds_modelo as modelo,
            vl_avaliacao as preco,
            dt_ano as ano,
            bt_disponivel as disponivel,
            img_carro as img_carro
        FROM tb_carros
    `;

    let resp = await conexao.query(comando);
    let lista = resp[0];

    return lista;
}

export async function buscarPorMarca(marca) {
    let comando = `
    SELECT id_carro as id,
    nm_marca as marca,
    ds_modelo as modelo,
    vl_avaliacao as preco,
    dt_ano as ano,
    bt_disponivel as disponivel,
    img_carro as img_carro
FROM tb_carros
        WHERE nm_marca LIKE ?
    `;

    let resp = await conexao.query(comando, ['%' + marca + '%']);
    let lista = resp[0];

    return lista;
}

export async function buscarPorId(id) {
    let comando = `
    SELECT id_carro as id,
    nm_marca as marca,
    ds_modelo as modelo,
    vl_avaliacao as preco,
    dt_ano as ano,
    bt_disponivel as disponivel,
    img_carro as img_carro
FROM tb_carros
        WHERE id_carro = ?
    `;

    let resp = await conexao.query(comando, [id]);
    let lista = resp[0];

    return lista[0];
}

export async function alterar(id, carro) {
    let comando = `
        UPDATE tb_carros
        SET nm_marca = ?,
            ds_modelo = ?,
            vl_avaliacao = ?,
            dt_ano = ?,
            bt_disponivel = ?,
            img_carro = ?
        WHERE id_carro = ?;
    `;

    let resp = await conexao.query(comando, [
        carro.marca,
        carro.modelo,
        carro.preco,
        carro.ano,
        carro.disponivel,
        carro.img_carro,
        id
    ]);

    let info = resp[0];
    return info.affectedRows;
}

export async function remover(id) {
    let comando = `DELETE FROM tb_carros WHERE id_carro = ?`;

    let resp = await conexao.query(comando, [id]);
    let info = resp[0];

    return info.affectedRows;
}