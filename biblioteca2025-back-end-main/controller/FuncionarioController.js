import Funcionario from "../model/FuncionarioModel.js";

async function listar(req, res) {
  try {
    const respostaBanco = await Funcionario.findAll();
    return res.json(respostaBanco);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

async function selecionar(req, res) {
  try {
    const id = req.params.id;
    const emprestimo = await Funcionario.findByPk(id);
    if (!emprestimo) {
      return res.status(404).send("Empréstimo não encontrado.");
    }
    return res.json(emprestimo);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

// nomefuncionario, email, salario e contratacao
async function inserir(req, res) {
  const { nomefunctionario, email, salario, contratacao } = req.body;
  if (!nomefunctionario) {
    return res.status(422).send("O parâmetro nomefunctionario é obrigatório.");
  }
  if (!email) {
    return res.status(422).send("O parâmetro email é obrigatório.");
  }
  if (!salario) {
    return res.status(422).send("O parâmetro salario é obrigatório.");
  }
  if (!contratacao) {
    return res.status(422).send("O parâmetro contratacao é obrigatório.");
  }
  const respostaBanco = await Funcionario.create(req.body);
  res.json(respostaBanco);
}
// nomefunctionario, cpf, email, telefone, nascimento, salario, contratacao, demissao, ativo, senha, token
async function alterar(req, res) {
  const nomefunctionario = req.body.nomefunctionario;
  const cpf = req.body.cpf;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const nascimento = req.body.nascimento;
  const salario = req.body.salario;
  const contratacao = req.body.contratacao;
  const demissao = req.body.demissao;
  const ativo = req.body.ativo;
  const senha = req.body.senha;
  const token = req.body.token;

  const idfuncionario = req.params.id;

  if (!nomefunctionario) {
    return res.status(422).send("O parâmetro nomefunctionario é obrigatório.");
  }
  if (!email) {
    return res.status(422).send("O parâmetro email é obrigatório.");
  }
  if (!salario) {
    return res.status(422).send("O parâmetro salario é obrigatório.");
  }
  if (!contratacao) {
    return res.status(422).send("O parâmetro contratacao é obrigatório.");
  }
  // nomefunctionario, cpf, email, telefone, nascimento, salario, contratacao, demissao, ativo, senha, token

  const respostaBanco = await Funcionario.update(
    {
      nomefunctionario,
      cpf,
      email,
      telefone,
      nascimento,
      salario,
      contratacao,
      demissao,
      ativo,
      senha,
      token,
    },
    { where: { idfuncionario } }
  );
  res.json(respostaBanco);
}

async function demitir(req, res) {
  const idfuncionario = req.params.id;
  const demissao = req.body;

  if (!demissao) {
    return res.status(422).send("O parâmetro demissao é obrigatório.");
  }

  const funcionario = await Funcionario.findByPk(idfuncionario);
  if (!funcionario) {
    return res.status(404).send("Funcionário não encontrado.");
  }
  if (!funcionario.ativo) {
    return res.status(422).send("Funcionário já demitido.");
  }
  const respostaBanco = await Funcionario.update(
    { ativo: false, demissao },
    { where: { idfuncionario } }
  );
  res.json(respostaBanco);
}

async function senha(req, res) {
  const idfuncionario = req.params.id;
  const { senha } = req.body;
  if (senha.length < 6 || senha.length > 20) {
    return res
      .status(422)
      .send(
        "A senha deve conter no mínimo 6 caracteres e no máximo 20 caracteres."
      );
  }
  const funcionario = await Funcionario.findByPk(idfuncionario);
  if (!funcionario) {
    return res.status(404).send("Funcionário não encontrado.");
  }

  const respostaBanco = await Funcionario.update(
    { token: null, senha },
    { where: { idfuncionario } }
  );
  res.json(respostaBanco);
}
export default { listar, selecionar, inserir, alterar, demitir, senha };
