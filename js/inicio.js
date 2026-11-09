function renderizarAlertas() {
  const areaAlertas = document.getElementById("alertas");

  const produtosEmFalta = listaProdutos
    .filter((produto) => produto.ativo && produto.estoque <= LIMITE_ESTOQUE_BAIXO)
    .sort((a, b) => a.estoque - b.estoque);

  if (produtosEmFalta.length === 0) {
    areaAlertas.innerHTML = '<p class="vazio">Nenhum produto com estoque baixo.</p>';
    return;
  }

  const itens = produtosEmFalta.map((produto) => {
    const texto = produto.estoque === 0 ? "Esgotado" : `${produto.estoque} un.`;
    return `<li class="alerta-item"><span>${escaparHtml(produto.nome)}</span><strong>${texto}</strong></li>`;
  });

  areaAlertas.innerHTML = `<ul class="alertas">${itens.join("")}</ul>`;
}
