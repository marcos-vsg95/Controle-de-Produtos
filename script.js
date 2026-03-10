class Produto {
    constructor(nome, preco){
        this.nome = nome;
        this._preco = Number(preco);
    }

    get preco(){
        return this._preco;
    }

    set preco(newPreco){
        this._preco = newPreco;
    }

    get precoFormatado(){
        return `R$${this._preco.toFixed(2)}`
    }

    static validarPreco(valor){
        return valor > 0;
    }
}

validarCampos = (nome, preco) => {
    if(!nome || !preco){
        alert('Campos Vazios');
        return false;
    }
    return true;
}

const listaProdutos = document.querySelector('#listaProdutos');
const form = document.querySelector('.form');
const total = document.querySelector('#valorTotal');
const produtos = new Map();

form.addEventListener('submit', event => {
    event.preventDefault();

    const nomeProduto = document.querySelector('#nomeProduto');
    const precoProduto = document.querySelector('#precoProduto');

    if(!validarCampos(nomeProduto.value, precoProduto.value))
    return;

    const produto = new Produto(nomeProduto.value, precoProduto.value);

    if(!Produto.validarPreco(Number(precoProduto.value))) {
        alert('Erro!!! Preço Inválido');
        return;
    }

    if (produtos.has(produto.nome)) {
        alert("Produto já existe!");
        return;
    }

    produtos.set(produto.nome, produto);

    addProdutoLista(produto);

    total.innerHTML = calcularTotal(produtos);

    nomeProduto.value = '';
    precoProduto.value = '';
});

const addProdutoLista = (produto) => {
    const li = document.createElement('li');

    li.innerHTML = `${produto.nome} - ${produto.precoFormatado}`
    listaProdutos.appendChild(li);
}

const calcularTotal = (produtos) => {
    let total = 0;
    for (const produto of produtos.values()) {
        total += produto.preco;
    }
    return total.toFixed(2);
}
