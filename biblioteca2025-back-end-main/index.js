import express from "express";
import banco from "./banco.js";
import editora from "./controller/EditoraController.js";
import autor from "./controller/AutorController.js";
import categoria from "./controller/CategoriaController.js";
import livro from "./controller/LivroController.js";
import usuario from "./controller/UsuarioController.js";
import emprestimo from "./controller/EmprestimoController.js";
import devolucao from "./controller/DevolucaoController.js";
import funcionario from "./controller/FuncionarioController.js";

try {
  await banco.authenticate();
  console.log("Conexão com o banco de dados realizada com sucesso.");
} catch (error) {
  console.error("Erro ao conectar com o banco de dados:", error);
}

const app = express();
app.use(express.json());

app.get("/teste", (req, res) => {
  res.send("Teste ok.");
});

//rotas crud da tabela editora
app.get("/editora", editora.listar);
app.get("/editora/:id", editora.selecionar);
app.post("/editora", editora.inserir);
app.put("/editora/:id", editora.alterar);
app.delete("/editora/:id", editora.excluir);

//rotas crud da tabela autor
app.get("/autor", autor.listar);
app.get("/autor/:id", autor.selecionar);
app.post("/autor", autor.inserir);
app.put("/autor/:id", autor.alterar);
app.delete("/autor/:id", autor.excluir);

//rotas crud da tabela categoria
app.get("/categoria", categoria.listar);
app.get("/categoria/:id", categoria.selecionar);
app.post("/categoria", categoria.inserir);
app.put("/categoria/:id", categoria.alterar);
app.delete("/categoria/:id", categoria.excluir);

//rotas crud da tabela livro
app.get("/livro", livro.listar);
app.get("/livro/:id", livro.selecionar);
app.post("/livro", livro.inserir);
app.put("/livro/:id", livro.alterar);
app.delete("/livro/:id", livro.excluir);

//rotas crud da tabela usuario
app.get("/usuario", usuario.listar);
app.get("/usuario/:id", usuario.selecionar);
app.post("/usuario", usuario.inserir);
app.put("/usuario/:id", usuario.alterar);
app.delete("/usuario/:id", usuario.excluir);

//rotas crud da tabela emprestimo
app.get("/emprestimo", emprestimo.listar);
app.get("/emprestimo/:id", emprestimo.selecionar);
app.post("/emprestar", emprestimo.emprestar);
app.put("/devolver/:id", emprestimo.devolver);

// Devolução
app.post("/devolver", devolucao);

app.get("/funcionario", funcionario.listar);
app.get("/funcionario/:id", funcionario.selecionar);
app.post("/funcionario/", funcionario.inserir);
app.put("/funcionario/:id", funcionario.alterar);
app.put("/demitir/:id", funcionario.demitir);

app.listen(3000, () => {
  console.log(`Servidor rodando.`);
});
