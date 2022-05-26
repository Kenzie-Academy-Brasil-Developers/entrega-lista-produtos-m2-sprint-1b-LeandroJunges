const main = document.querySelector("main")

const divPrecoTotal = document.createElement("div")
divPrecoTotal.classList.add("containerPrecoTotal")

const precoTotal = document.createElement("p");
precoTotal.classList.add("total")
precoTotal.innerText= "Preço total: R$";

let valor = document.createElement("span");
valor.classList.add("preco")
valor.innerText = `${somarProdutos(itens)},00` ;

precoTotal.append(valor);
divPrecoTotal.append(precoTotal)
main.append(divPrecoTotal)

function criarCard(produto){
    const ul = document.querySelector("ul");
    
    const itens = criarProduto(produto)
    
    ul.append(itens)
}

function somarProdutos(produto){
    let total = 0
    for(let i = 0; i<produto.length; i++){
            total += produto[i].preco
    }
    return total
}

function criarProduto(produto){
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = produto.img

    const nome = document.createElement("h3");
    nome.innerText = produto.nome
    
    const span = document.createElement("span");
    span.innerText = produto.secao

    const preco = document.createElement("p");
    preco.innerText = `R$${produto.preco},00`

 
    li.append(img, nome,span, preco,)
    return li
}

function montarDados(produto){
    const ul = document.querySelector("ul");
    ul.innerHTML = "";

    for(let i= 0; i < produto.length; i++){
        const item = produto[i]
        criarCard(item)
    }

}
montarDados(itens)

const btnBuscar = document.querySelector("#btnBuscar")

btnBuscar.addEventListener("click", ()=>{
    let funcao = filtrarProduto();
    const ul = document.querySelector("ul");
    ul.innerHTML= "";
    const input = document.querySelector(".campoBuscaPorNome")
    input.value = "";

    montarDados(funcao)
    const preco = document.querySelector(".preco")
    preco.innerText = `${somarProdutos(funcao)},00`


}) 
const todosProdutos = document.querySelector("#todosProdutos");
todosProdutos.addEventListener("click",()=>{
    
    montarDados(itens)
    const preco = document.querySelector(".preco")
    preco.innerText = `${somarProdutos(itens)},00`
    
})

const hortFruit = document.querySelector("#hortifruit");
hortFruit.addEventListener("click", ()=>{
 
    filtrarCategoria("Hortifruti");
})

const panificadora = document.getElementById("panificadora");
panificadora.addEventListener("click", ()=>{
    filtrarCategoria("Panificadora")
    
})

const laticinio = document.getElementById("laticinios")
laticinio.addEventListener("click", ()=>{
        
    filtrarCategoria("Laticínio")
})

function filtrarCategoria(secao){

    const listaDeCategoria = itens.filter(item => item.secao == secao )
     const preco = document.querySelector(".preco")
     preco.innerText = `${somarProdutos(listaDeCategoria)},00`

    montarDados(listaDeCategoria)

}

function filtrarProduto(){
    const input = document.querySelector(".campoBuscaPorNome").value
    const verificarLista = itens.filter(item => item.nome.toLocaleLowerCase().includes(input) || item.secao.toLocaleLowerCase().includes(input) || item.nome.toLocaleLowerCase().includes(input) || item.nome.includes(input) ) 
    return verificarLista
}

