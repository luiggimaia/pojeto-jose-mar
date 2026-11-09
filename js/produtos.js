const LIMITE_ESTOQUE_BAIXO = 5;

let listaProdutos = carregarProdutos();

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function adicionarProduto(dados) {
  const novoProduto = { id: gerarId(), ...dados };
  listaProdutos.push(novoProduto);
  salvarProdutos(listaProdutos);
}

function editarProduto(id, dados) {
  listaProdutos = listaProdutos.map((produto) => {
    return produto.id === id ? { ...produto, ...dados } : produto;
  });
  salvarProdutos(listaProdutos);
}

function removerProduto(id) {
  listaProdutos = listaProdutos.filter((produto) => produto.id !== id);
  salvarProdutos(listaProdutos);
}

function buscarProduto(id) {
  return listaProdutos.find((produto) => produto.id === id);
}

function alternarStatus(id) {
  const produto = buscarProduto(id);
  editarProduto(id, { ativo: !produto.ativo });
}

function filtrarProdutos(textoBusca, categoria, ordem) {
  const termo = textoBusca.trim().toLowerCase();

  const resultado = listaProdutos.filter((produto) => {
    const combinaNome = produto.nome.toLowerCase().includes(termo);
    const combinaCategoria = categoria === "todas" || produto.categoria === categoria;
    return combinaNome && combinaCategoria;
  });

  if (ordem === "nome") {
    resultado.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (ordem === "menor-preco") {
    resultado.sort((a, b) => a.preco - b.preco);
  } else if (ordem === "maior-preco") {
    resultado.sort((a, b) => b.preco - a.preco);
  }

  return resultado;
}

function calcularResumo() {
  const total = listaProdutos.length;

  const valorEmEstoque = listaProdutos.reduce((soma, produto) => {
    return soma + produto.preco * produto.estoque;
  }, 0);

  const estoqueBaixo = listaProdutos.filter((produto) => {
    return produto.ativo && produto.estoque <= LIMITE_ESTOQUE_BAIXO;
  }).length;

  return { total, valorEmEstoque, estoqueBaixo };
}

function validarProduto(dados) {
  const erros = {};

  if (dados.nome.length < 3) {
    erros.nome = "Informe um nome com pelo menos 3 caracteres.";
  }
  if (!dados.categoria) {
    erros.categoria = "Escolha uma categoria.";
  }
  if (!(dados.preco > 0)) {
    erros.preco = "O preço deve ser maior que zero.";
  }
  if (!Number.isInteger(dados.estoque) || dados.estoque < 0) {
    erros.estoque = "Informe um número inteiro, zero ou mais.";
  }
  if (dados.tamanhos.length === 0) {
    erros.tamanhos = "Marque ao menos um tamanho.";
  }
  if (dados.imagem && !/^https?:\/\//i.test(dados.imagem)) {
    erros.imagem = "Use um link que comece com http:// ou https://.";
  }

  return erros;
}
