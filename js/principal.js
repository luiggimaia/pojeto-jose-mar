formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = lerFormulario();
  const erros = validarProduto(dados);
  mostrarErros(erros);

  if (Object.keys(erros).length > 0) {
    return;
  }

  const id = campoId.value;
  if (id) {
    editarProduto(id, dados);
  } else {
    adicionarProduto(dados);
  }

  limparFormulario();
  atualizarTela();
});

botaoCancelar.addEventListener("click", limparFormulario);

campoBusca.addEventListener("input", renderizarLista);
filtroCategoria.addEventListener("change", renderizarLista);
filtroOrdem.addEventListener("change", renderizarLista);

areaLista.addEventListener("click", (evento) => {
  const botao = evento.target.closest("button[data-acao]");
  if (!botao) {
    return;
  }

  const cartao = botao.closest(".cartao");
  const id = cartao.dataset.id;
  const acao = botao.dataset.acao;

  if (acao === "editar") {
    preencherFormulario(buscarProduto(id));
  } else if (acao === "status") {
    alternarStatus(id);
    atualizarTela();
  } else if (acao === "excluir") {
    const produto = buscarProduto(id);
    if (confirm(`Excluir "${produto.nome}"?`)) {
      removerProduto(id);
      if (campoId.value === id) {
        limparFormulario();
      }
      atualizarTela();
    }
  }
});

atualizarTela();
