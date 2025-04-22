import Categoria from "../model/CategoriaModel.js";

async function listar(req, res) {
    const respostaBanco = await Categoria.findAll();
    res.json(respostaBanco);
}

async function selecionar(req, res) {
    const id = req.params.id;
    const respostaBanco = await Categoria.findByPk(id);
    res.json(respostaBanco);
}

async function inserir(req, res) {
    const respostaBanco = await Categoria.create(req.body);
    res.json(respostaBanco);
}

async function alterar(req, res) {
    const nomecategoria = req.body.nomecategoria;

    const idcategoria = req.params.id;

    const respostaBanco = await Categoria.update(
        { nomecategoria },
        { where: { idcategoria } });
    res.json(respostaBanco);
}

async function excluir(req, res) {
    const idcategoria = req.params.id;

    const respostaBanco = await Categoria.destroy({ where: { idcategoria } });
    res.json(respostaBanco);
}

export default { listar, selecionar, inserir, alterar, excluir };