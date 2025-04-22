import Editora from "../model/EditoraModel.js";

async function listar(req, res) {
    const respostaBanco = await Editora.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Editora.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    //    const nomeeditora = req.body.nomeeditora;
    //    const cnpj = req.body.cnpj;
    //    const endereco = req.body.endereco;
    const respostaBanco = await Editora.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const nomeeditora = req.body.nomeeditora;
    const cnpj = req.body.cnpj;
    const endereco = req.body.endereco;

    const ideditora = req.params.id;

    const respostaBanco = await Editora.update(
        { nomeeditora, cnpj, endereco },
        { where: { ideditora } });
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const ideditora = req.params.id;

    const respostaBanco = await Editora.destroy({ where: { ideditora } });
    res.json(respostaBanco);
}

export default { listar, selecionar, inserir, alterar, excluir };