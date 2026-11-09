const CHAVE_PRODUTOS = "fashiontrends_produtos";

function criarProdutosIniciais() {
  return [
    { id: "p1", nome: "Camiseta Oversized Linho", descricao: "Camiseta ampla em mistura de linho.", categoria: "Camisetas", cor: "Areia", preco: 89.9, estoque: 24, tamanhos: ["P", "M", "G"], imagem: "", ativo: true },
    { id: "p2", nome: "Calça Alfaiataria Reta", descricao: "Corte reto com cintura alta.", categoria: "Calças", cor: "Preto", preco: 189.9, estoque: 4, tamanhos: ["M", "G", "GG"], imagem: "", ativo: true },
    { id: "p3", nome: "Vestido Midi Floral", descricao: "Vestido leve com estampa floral.", categoria: "Vestidos", cor: "Verde", preco: 229.0, estoque: 12, tamanhos: ["P", "M"], imagem: "", ativo: true },
    { id: "p4", nome: "Cinto de Couro", descricao: "Cinto com fivela metálica.", categoria: "Acessórios", cor: "Marrom", preco: 59.9, estoque: 0, tamanhos: ["M", "G"], imagem: "", ativo: false }
  ];
}

function carregarProdutos() {
  try {
    const texto = localStorage.getItem(CHAVE_PRODUTOS);
    if (texto === null) {
      return criarProdutosIniciais();
    }
    return JSON.parse(texto);
  } catch (erro) {
    return [];
  }
}

function salvarProdutos(lista) {
  localStorage.setItem(CHAVE_PRODUTOS, JSON.stringify(lista));
}
