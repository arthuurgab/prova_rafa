import Usuario from "../model/UsuarioModel.js";

async function listar(req, res) {
    const respostaBanco = await Usuario.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Usuario.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Usuario.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const nascimento = req.body.nascimento;

    const idusuario = req.params.id;

    const respostaBanco = await Usuario.update(
        { nome, cpf, email, telefone, nascimento },
        { where: { idusuario } });
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const idusuario = req.params.id;

    const respostaBanco = await Usuario.destroy({ where: { idusuario } });
    res.json(respostaBanco);
}

export default { listar, selecionar, inserir, alterar, excluir };