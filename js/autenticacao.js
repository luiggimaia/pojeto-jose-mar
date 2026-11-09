const CHAVE_SESSAO = "fashiontrends_sessao";

const USUARIOS_CADASTRADOS = [
  { usuario: "admin", senha: "fashion123", nome: "Administrador" }
];

function entrar(usuario, senha) {
  const encontrado = USUARIOS_CADASTRADOS.find((item) => {
    return item.usuario === usuario && item.senha === senha;
  });

  if (!encontrado) {
    return false;
  }

  const sessao = { usuario: encontrado.usuario, nome: encontrado.nome };
  sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
  return true;
}

function usuarioLogado() {
  try {
    const texto = sessionStorage.getItem(CHAVE_SESSAO);
    return texto ? JSON.parse(texto) : null;
  } catch (erro) {
    return null;
  }
}

function sair() {
  sessionStorage.removeItem(CHAVE_SESSAO);
}
