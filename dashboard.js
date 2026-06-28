const dataAtual = document.getElementById("dataAtual");

const saudacao = document.getElementById("saudacao");

const hoje = new Date();

dataAtual.innerText = hoje.toLocaleDateString("pt-BR",{

    weekday:"long",

    day:"2-digit",

    month:"long",

    year:"numeric"

});

const hora = hoje.getHours();

if(hora < 12){

    saudacao.innerText="Bom dia! 👋";

}
else if(hora < 18){

    saudacao.innerText="Boa tarde! 👋";

}
else{

    saudacao.innerText="Boa noite! 🌙";

}