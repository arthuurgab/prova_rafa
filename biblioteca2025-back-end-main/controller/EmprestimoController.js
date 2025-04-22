import Emprestimo from "../model/EmprestimoModel.js";
import Livro from "../model/LivroModel.js";
import Usuario from "../model/UsuarioModel.js";
import moment from "moment";

async function listar(req, res) {
  try {
    const respostaBanco = await Emprestimo.findAll();
    return res.json(respostaBanco);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function selecionar(req, res) {
  try {
    const id = req.params.id;
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) {
      return res.status(404).send("Empréstimo não encontrado.");
    }
    return res.json(emprestimo);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function emprestar(req, res) {
  try {
    // Lendo os parâmetros da requisição
    const { idlivro, idusuario } = req.body;

    // Validações dos parâmetros obrigatórios
    if (!idlivro) {
      return res.status(422).send("O parâmetro idlivro é obrigatório.");
    }
    if (!idusuario) {
      return res.status(422).send("O parâmetro idusuario é obrigatório.");
    }

    // Verifica se o livro existe
    const livroBanco = await Livro.findByPk(idlivro);
    if (!livroBanco) {
      return res.status(404).send("Livro não encontrado.");
    }

    // Verifica se o usuário existe
    const usuarioBanco = await Usuario.findByPk(idusuario);
    if (!usuarioBanco) {
      return res.status(404).send("Usuário não encontrado.");
    }

    // Verifica se o livro está ativo e não está emprestado
    if (!livroBanco.ativo) {
      return res.status(422).send("Este livro está inativo.");
    }
    if (livroBanco.emprestado) {
      return res.status(422).send("Este livro já está emprestado.");
    }

    // (Opcional) Verifica se o usuário possui empréstimo pendente
    // Lógica a implementar, se necessário.

    // Define a data de empréstimo e vencimento
    const emprestimoData = moment().format("YYYY-MM-DD");
    const vencimento = moment().add(15, "days").format("YYYY-MM-DD");

    // Insere o novo empréstimo no banco
    const novoEmprestimo = await Emprestimo.create({
      idlivro,
      idusuario,
      emprestimo: emprestimoData,
      vencimento,
    });

    // Atualiza o status do livro para emprestado (true)
    await Livro.update(
      { emprestado: true },
      { where: { idlivro } }
    );

    return res.json(novoEmprestimo);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function devolver(req, res) {
  try {
    // Obtém o id do empréstimo a partir dos parâmetros (geralmente na rota, por exemplo: /devolver/:id)
    const idemprestimo = req.params.id;

    // Busca o registro do empréstimo
    const emprestimoRegistro = await Emprestimo.findByPk(idemprestimo);
    if (!emprestimoRegistro) {
      return res.status(404).send("Empréstimo não encontrado.");
    }
    
    // Verifica se o empréstimo já foi devolvido
    if (emprestimoRegistro.devolucao) {
      return res.status(422).send("Este empréstimo já foi devolvido.");
    }
    
    // Define a data de devolução
    const data_devolucao = moment().format("YYYY-MM-DD");
    
    // Atualiza o campo "devolucao" do empréstimo
    await Emprestimo.update(
      { devolucao: data_devolucao },
      { where: { idemprestimo } }
    );
    
    // Atualiza o status do livro para disponível (emprestado: false)
    await Livro.update(
      { emprestado: false },
      { where: { idlivro: emprestimoRegistro.idlivro } }
    );
    
    return res.status(200).send("Livro devolvido com sucesso.");
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

export default { listar, selecionar, emprestar, devolver };
