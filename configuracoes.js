const input = document.getElementById("nome");

const botaoSalvar = document.getElementById("salvarNome");

const botaoLimpar = document.getElementById("limpar");

// Carregar nome salvo
input.value = carregarDados("nome") || "";

botaoSalvar.onclick = () => {

    salvarDados("nome", input.value);

    alert("Nome salvo!");

};

botaoLimpar.onclick = () => {

    if(confirm("Deseja apagar todos os dados?")){

        localStorage.clear();

        alert("Dados apagados.");

        location.reload();

    }

};