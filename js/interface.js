const formulario = document.getElementById("formulario");
const tituloFormulario = document.getElementById("tituloFormulario");
const campoId = document.getElementById("campoId");
const campoNome = document.getElementById("campoNome");
const campoDescricao = document.getElementById("campoDescricao");
const campoCategoria = document.getElementById("campoCategoria");
const campoCor = document.getElementById("campoCor");
const campoPreco = document.getElementById("campoPreco");
const campoEstoque = document.getElementById("campoEstoque");
const campoImagem = document.getElementById("campoImagem");
const campoAtivo = document.getElementById("campoAtivo");
const botaoCancelar = document.getElementById("botaoCancelar");
const campoBusca = document.getElementById("campoBusca");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroOrdem = document.getElementById("filtroOrdem");
const areaLista = document.getElementById("lista");
const areaResumo = document.getElementById("resumo");

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function escaparHtml(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lerFormulario() {
  const marcados = document.querySelectorAll('input[name="tamanho"]:checked');
  const tamanhos = Array.from(marcados).map((caixa) => caixa.value);

  return {
    nome: campoNome.value.trim(),
    descricao: campoDescricao.value.trim(),
    categoria: campoCategoria.value,
    cor: campoCor.value.trim(),
    preco: parseFloat(campoPreco.value),
    estoque: parseInt(campoEstoque.value, 10),
    tamanhos: tamanhos,
    imagem: campoImagem.value.trim(),
    ativo: campoAtivo.checked
  };
}

function mostrarErros(erros) {
  document.querySelectorAll("[data-erro]").forEach((span) => {
    span.textContent = erros[span.dataset.erro] || "";
  });
}

function preencherFormulario(produto) {
  campoId.value = produto.id;
  campoNome.value = produto.nome;
  campoDescricao.value = produto.descricao;
  campoCategoria.value = produto.categoria;
  campoCor.value = produto.cor;
  campoPreco.value = produto.preco;
  campoEstoque.value = produto.estoque;
  campoImagem.value = produto.imagem;
  campoAtivo.checked = produto.ativo;

  document.querySelectorAll('input[name="tamanho"]').forEach((caixa) => {
    caixa.checked = produto.tamanhos.includes(caixa.value);
  });

  tituloFormulario.textContent = "Editar produto";
  botaoCancelar.hidden = false;
  mostrarErros({});
  campoNome.focus();
}

function limparFormulario() {
  formulario.reset();
  campoId.value = "";
  campoAtivo.checked = true;
  tituloFormulario.textContent = "Novo produto";
  botaoCancelar.hidden = true;
  mostrarErros({});
}

function renderizarResumo() {
  const resumo = calcularResumo();
  const classeAtencao = resumo.estoqueBaixo > 0 ? "indicador atencao" : "indicador";

  areaResumo.innerHTML = `
    <div class="indicador"><span>Produtos cadastrados</span><strong>${resumo.total}</strong></div>
    <div class="indicador"><span>Valor em estoque</span><strong>${formatarMoeda(resumo.valorEmEstoque)}</strong></div>
    <div class="${classeAtencao}"><span>Estoque baixo (${LIMITE_ESTOQUE_BAIXO} ou menos)</span><strong>${resumo.estoqueBaixo}</strong></div>
  `;
}

function criarCartao(produto) {
  const imagem = produto.imagem
    ? `<img src="${escaparHtml(produto.imagem)}" alt="${escaparHtml(produto.nome)}">`
    : `<div class="sem-imagem">${escaparHtml(produto.nome.charAt(0).toUpperCase())}</div>`;

  const classeEstoque = produto.estoque <= LIMITE_ESTOQUE_BAIXO ? "estoque baixo" : "estoque";
  const textoEstoque = produto.estoque === 0 ? "Esgotado" : `${produto.estoque} em estoque`;
  const classeCartao = produto.ativo ? "cartao" : "cartao inativo";
  const textoStatus = produto.ativo ? "Desativar" : "Ativar";

  return `
    <article class="${classeCartao}" data-id="${produto.id}">
      ${imagem}
      <div class="cartao-corpo">
        <h3>${escaparHtml(produto.nome)}</h3>
        <p class="detalhe">${escaparHtml(produto.categoria)} · ${escaparHtml(produto.cor || "Sem cor")}</p>
        <p class="detalhe">Tamanhos: ${produto.tamanhos.join(", ")}</p>
        <p class="preco">${formatarMoeda(produto.preco)}</p>
        <p class="${classeEstoque}">${textoEstoque}</p>
      </div>
      <div class="cartao-acoes">
        <button type="button" data-acao="editar">Editar</button>
        <button type="button" class="secundario" data-acao="status">${textoStatus}</button>
        <button type="button" class="perigo" data-acao="excluir">Excluir</button>
      </div>
    </article>
  `;
}

function renderizarLista() {
  const produtos = filtrarProdutos(campoBusca.value, filtroCategoria.value, filtroOrdem.value);

  if (produtos.length === 0) {
    areaLista.innerHTML = '<p class="vazio">Nenhum produto encontrado. Ajuste os filtros ou cadastre um novo produto.</p>';
    return;
  }

  areaLista.innerHTML = produtos.map(criarCartao).join("");
}

function atualizarTela() {
  renderizarResumo();
  renderizarAlertas();
  renderizarLista();
}
