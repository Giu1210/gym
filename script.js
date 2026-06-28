// =====================================
// GYM TRACKER
// HOME
// =====================================

// ---------- DATA ----------

const hoje = new Date();

const opcoes = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
};

document.getElementById("dataAtual").textContent =
    hoje.toLocaleDateString("pt-BR", opcoes);

// ---------- SAUDAÇÃO ----------

const hora = hoje.getHours();

let saudacao = "";

if(hora < 12){

    saudacao = "☀️ Bom dia!";

}else if(hora < 18){

    saudacao = "🌤 Boa tarde!";

}else{

    saudacao = "🌙 Boa noite!";

}

document.getElementById("saudacao").textContent = saudacao;

// ---------- FRASE MOTIVACIONAL ----------

const frases = [

"Cada treino te aproxima do seu objetivo. 💪",

"A disciplina vence a motivação. 🔥",

"Você é mais forte do que imagina. 🏋️",

"Não desista. Resultados levam tempo. ⏳",

"Hoje melhor que ontem. 🚀",

"Pequenos passos geram grandes resultados. ⭐",

"Seu único concorrente é você mesmo. 💚"

];

const frase =
frases[Math.floor(Math.random()*frases.length)];

document.getElementById("fraseMotivacao").textContent = frase;

document.getElementById("motivacao").textContent = frase;

// ---------- HISTÓRICO ----------

const historico =
carregarDados("historico") || [];

document.getElementById("totalTreinos").textContent =
historico.length;

document.getElementById("diasTreinados").textContent =
historico.length;

// ---------- ÚLTIMO TREINO ----------

const ultimoTreino =
document.getElementById("ultimoTreino");

if(historico.length){

    const ultimo =
    historico[historico.length-1];

    ultimoTreino.innerHTML = `

<strong>${ultimo.treino}</strong>

<br>

📅 ${ultimo.data}

${ultimo.hora ? "<br>🕒 "+ultimo.hora : ""}

`;

}else{

    ultimoTreino.textContent =
    "Nenhum treino realizado.";

}

// ---------- TEMPO TOTAL ----------

let minutos = 0;

historico.forEach(item=>{

    if(item.tempo){

        const numeros =
        item.tempo.match(/\d+/g);

        if(numeros){

            if(numeros.length===2){

                minutos +=
                Number(numeros[0])*60;

                minutos +=
                Number(numeros[1]);

            }

        }

    }

});

document.getElementById("tempoTreinado").textContent =
`${Math.floor(minutos/60)}h`;

document.getElementById("tempoTotal").textContent =
`${Math.floor(minutos/60)}h`;

// ---------- VOLUME ----------

let volume = 0;

historico.forEach(item=>{

    if(item.volume){

        volume += parseInt(item.volume);

    }

});

document.getElementById("volumeTotal").textContent =
volume.toLocaleString("pt-BR")+" kg";

// ---------- MEDIDAS ----------

const medidas =
carregarDados("medidas") || [];

if(medidas.length){

    const ultima =
    medidas[medidas.length-1];

    document.getElementById("pesoAtual").textContent =
    ultima.peso+" kg";

    document.getElementById("ultimoPeso").textContent =
    ultima.peso+" kg";

    document.getElementById("ultimaCintura").textContent =
    ultima.cintura+" cm";

    document.getElementById("ultimoGluteo").textContent =
    ultima.gluteo+" cm";

    document.getElementById("ultimaCoxa").textContent =
    ultima.coxa+" cm";

}

// ---------- RECORDES ----------

const recordes =
carregarDados("recordes") || [];

document.getElementById("recordesTotal").textContent =
recordes.length;

const recordesHome =
document.getElementById("recordesHome");

if(recordes.length){

    recordesHome.innerHTML="";

    recordes
    .slice(0,5)
    .forEach(r=>{

        recordesHome.innerHTML += `

<p>

🏆 <strong>${r.exercicio}</strong>

<br>

${r.carga} kg

</p>

<hr>

`;

    });

}

// ---------- SEQUÊNCIA ----------

document.getElementById("sequencia").textContent =
historico.length;