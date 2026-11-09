const telaLogin = document.getElementById("telaLogin");
const telaApp = document.getElementById("telaApp");
const formularioLogin = document.getElementById("formularioLogin");
const campoUsuario = document.getElementById("campoUsuario");
const campoSenha = document.getElementById("campoSenha");
const erroLogin = document.getElementById("erroLogin");
const nomeUsuario = document.getElementById("nomeUsuario");
const saudacao = document.getElementById("saudacao");
const botaoSair = document.getElementById("botaoSair");

function paginaAtual() {
  const nome = window.location.hash.replace("#", "");
  const secoes = Array.from(document.querySelectorAll(".pagina"));
  const existe = secoes.some((secao) => secao.dataset.pagina === nome);
  return existe ? nome : "inicio";
}

function atualizarNavegacao() {
  const atual = paginaAtual();

  document.querySelectorAll(".pagina").forEach((secao) => {
    secao.hidden = secao.dataset.pagina !== atual;
  });

  document.querySelectorAll(".menu-link").forEach((link) => {
    const ativo = link.dataset.pagina === atual;
    link.classList.toggle("ativo", ativo);
    if (ativo) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function iniciarApp() {
  const usuario = usuarioLogado();

  telaLogin.hidden = usuario !== null;
  telaApp.hidden = usuario === null;

  if (usuario === null) {
    campoUsuario.focus();
    return;
  }

  nomeUsuario.textContent = usuario.nome;
  saudacao.textContent = `Olá, ${usuario.nome}`;
  atualizarTela();
  atualizarNavegacao();
}

formularioLogin.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const usuario = campoUsuario.value.trim();
  const senha = campoSenha.value;

  if (!entrar(usuario, senha)) {
    erroLogin.textContent = "Usuário ou senha incorretos.";
    campoSenha.value = "";
    campoSenha.focus();
    return;
  }

  formularioLogin.reset();
  erroLogin.textContent = "";
  window.location.hash = "inicio";
  iniciarApp();
});

botaoSair.addEventListener("click", () => {
  sair();
  window.location.hash = "";
  iniciarApp();
});

window.addEventListener("hashchange", () => {
  if (usuarioLogado()) {
    atualizarNavegacao();
  }
});
