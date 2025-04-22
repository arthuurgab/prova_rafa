import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import moment from "moment";

async function devolucao(req, res) {
    const idemprestimo = req.body.idemprestimo;
    const observacao = req.body.observacao;

    // Validação: verificar se o parâmetro foi informado
    if (!idemprestimo) {
        return res.status(422).send('O parâmetro idemprestimo é obrigatório.');
    }

    // Buscar o empréstimo
    const emprestimo = await Emprestimo.findByPk(idemprestimo);
    if (!emprestimo) {
        return res.status(404).send('Empréstimo não encontrado.');
    }

    // Verificar se já foi devolvido
    if (emprestimo.devolucao) {
        return res.status(422).send('Este empréstimo já foi devolvido.');
    }

    // Atualizar devolução com a data atual
    const data_devolucao = moment().format('YYYY-MM-DD');

    await Emprestimo.update(
        { devolucao: data_devolucao, observacao },
        { where: { idemprestimo } }
    );

    // Atualizar o status do livro para "disponível"
    const idlivro = emprestimo.idlivro;
    await Livro.update(
        { emprestado: false },
        { where: { idlivro } }
    );

    return res.status(200).send('Livro devolvido com sucesso.');
}

export default devolucao;
