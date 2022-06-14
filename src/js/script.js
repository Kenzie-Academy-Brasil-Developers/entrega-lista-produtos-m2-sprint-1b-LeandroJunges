const main = document.querySelector("main")
const header = document.querySelector("header")
const divPrecoTotal = document.createElement("div")
divPrecoTotal.classList.add("containerPrecoTotal")

const imgTitulo = document.createElement("img")
//  imgTitulo.src = 
const titulo = document.createElement("h2");
titulo.classList.add("carrinho")
titulo.innerText= "Carrinho";
const listaCarrinho = document.createElement("ul");
listaCarrinho.className ="lista_carrinho";
const corpoCarrinho = document.createElement("div")
corpoCarrinho.className="corpo__carrinho";
corpoCarrinho.innerText = "Carrinho Vazio"


divPrecoTotal.append(imgTitulo,titulo,listaCarrinho, corpoCarrinho)
main.append(divPrecoTotal)

let valorTotal = 0

function criarCard(produto){
    const ul = document.querySelector("ul");
    
    const itens = criarProduto(produto)
    
    ul.append(itens)
}


function criarProduto(produto){
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = produto.img
    img.className="produtos"

    const nome = document.createElement("h3");
    nome.innerText = produto.nome
    
    const span = document.createElement("span");
    span.innerText = produto.secao
    const div = document.createElement("div")
    div.className = "compras"
    const preco = document.createElement("p");
    preco.innerText = `R$${produto.preco}.00`
    
    const summary = document.createElement("summary")
    const details = document.createElement("details")
    const listaNutrientes = document.createElement("ol")
    listaNutrientes.className ="lista_de_nutrientes"
    produto.componentes.forEach((e)=>{
        const nutrientes = document.createElement("li")
        nutrientes.innerText = e;

        listaNutrientes.appendChild(nutrientes)
        
    })

    const btnComprar = document.createElement("button")
    btnComprar.className = "botao__comprar"
    btnComprar.innerText = "Comprar"
    btnComprar.addEventListener("click", ()=>{

        listaCarrinho.append(carrinhoCompras(produto))
        const tituloCarrinho = document.querySelector(".corpo__carrinho")
        valorTotal+= produto.preco
        tituloCarrinho.innerText = `Total R$ ${valorTotal},00`
    })
    summary.appendChild(details);
    details.appendChild(listaNutrientes)
    div.append(preco, btnComprar)
    li.append(img, nome,span,summary, div)
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
 
}) 
const todosProdutos = document.querySelector("#todosProdutos");
todosProdutos.addEventListener("click",()=>{
    
    montarDados(itens)
   
    
})

const hortFruit = document.querySelector("#hortifruti");
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
    montarDados(listaDeCategoria)

}

function filtrarProduto(){
    const input = document.querySelector(".campoBuscaPorNome").value
    const verificarLista = itens.filter(item => item.nome.toLocaleLowerCase().includes(input) || item.secao.toLocaleLowerCase().includes(input)|| item.categoria.toLowerCase().includes(input)) 
    return verificarLista
}
function carrinhoCompras(produto){
  const  {nome, img, secao, preco  }= produto
    const listaProduto = document.createElement("li");
    listaProduto.className = "itens";
    const containerContent = document.createElement("div")
    containerContent.className ="container_conteudo";
    const name = document.createElement("h3");
    name.innerText = nome
    const span = document.createElement("span");
    span.innerText = secao
    const valor = document.createElement("p");
    valor.innerText = `R$${preco}.00`
    containerContent.append(name, span, valor)
    const containerImg = document.createElement("figure");
    containerImg.className= "container_imagem";
    const imagem = document.createElement("img");
    imagem.src = img
    const btnRemover = document.createElement("button")
    btnRemover.classList.add("remove")
    btnRemover.innerText ="";
    containerImg.appendChild(imagem)
    listaProduto.append(containerImg, containerContent, btnRemover)

    btnRemover.addEventListener("click",()=>{
        listaCarrinho.removeChild(listaProduto)

        valorTotal -= preco
        corpoCarrinho.innerText = `Total R$ ${valorTotal},00`
        if(valorTotal == 0){
           corpoCarrinho.innerText = "Carrinho Vazio" 
        }
    })
    return listaProduto
}



