let listaAnotacao = JSON.parse(localStorage.getItem("anotacao")) || []; // Obtém ou inicializa o array

function cadastrar(event) {
    event.preventDefault(); // Evita o envio do formulário e o recarregamento da página

    var anotacao = document.getElementById("anotacaoText").value;
    if (anotacao.trim() !== "") {
        listaAnotacao.push(anotacao);  // Adiciona a anotação ao array
        localStorage.setItem("anotacao", JSON.stringify(listaAnotacao));  // Salva o array como uma string JSON
        renderizarAnotacoes(); // Atualiza a exibição
    }
    document.getElementById("anotacaoText").value = ""; // Limpa o campo de entrada
}

function excluirAnotacao(index) {
    listaAnotacao.splice(index, 1); // Remove a anotação do array
    localStorage.setItem("anotacao", JSON.stringify(listaAnotacao)); // Atualiza o armazenamento
    renderizarAnotacoes(); // Atualiza a exibição
}

function renderizarAnotacoes() {
    const listaAnotacoesGravadas = document.getElementById("anotaçõesGravadas");
    listaAnotacoesGravadas.innerHTML = ''; 

    listaAnotacao.forEach((anotacao, index) => {
        const divAnotacao = document.createElement("div");
        divAnotacao.classList.add("anotacao-item");

        const textoAnotacao = document.createElement("span");
        textoAnotacao.textContent = anotacao;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("btn", "btn-outline-danger", "ms-2");
        botaoExcluir.innerHTML = '<span class="material-symbols-outlined">delete</span>';
        botaoExcluir.onclick = () => excluirAnotacao(index);

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("btn", "btn-outline-primary", "ms-2");
        botaoEditar.innerHTML = '<span class="material-symbols-outlined">edit_square</span>'; // Ícone de editar

        
        botaoEditar.onclick = () => {
            const inputEdicao = document.createElement("input");
            inputEdicao.type = "text";
            inputEdicao.value = anotacao;

            
            divAnotacao.replaceChild(inputEdicao, textoAnotacao);

            
            const botaoSalvar = document.createElement("button");
            botaoSalvar.classList.add("btn", "btn-outline-success", "ms-2");
            botaoSalvar.innerHTML = '<span class="material-symbols-outlined">save</span>';

            botaoSalvar.onclick = () => {
                listaAnotacao[index] = inputEdicao.value; 
                renderizarAnotacoes(); 
            };

            // Substitui o botão de editar pelo botão de salvar
            divAnotacao.replaceChild(botaoSalvar, botaoEditar);
        };

        divAnotacao.appendChild(textoAnotacao);
        divAnotacao.appendChild(botaoEditar);
        divAnotacao.appendChild(botaoExcluir);

        listaAnotacoesGravadas.appendChild(divAnotacao);
    });
}


window.onload = function() {
    renderizarAnotacoes(); 
};
