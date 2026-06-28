// ===============================
// GYM TRACKER
// MEDIDAS
// ===============================

let medidas = carregarDados("medidas") || [];

const ultimaDiv = document.getElementById("ultimaAvaliacao");
const evolucaoDiv = document.getElementById("evolucao");
const historicoDiv = document.getElementById("historicoMedidas");

// ===============================
// SALVAR
// ===============================

function salvarMedidas(){

    const avaliacao = {

        data: document.getElementById("data").value || new Date().toLocaleDateString("pt-BR"),

        peso: Number(document.getElementById("peso").value),

        cintura: Number(document.getElementById("cintura").value),

        abdomen: Number(document.getElementById("abdomen").value),

        quadril: Number(document.getElementById("quadril").value),

        gluteo: Number(document.getElementById("gluteo").value),

        coxa: Number(document.getElementById("coxa").value),

        panturrilha: Number(document.getElementById("panturrilha").value),

        braco: Number(document.getElementById("braco").value)

    };

    medidas.push(avaliacao);

    salvarDados("medidas", medidas);

    limparCampos();

    atualizarTela();

}

// ===============================
// LIMPAR CAMPOS
// ===============================

function limparCampos(){

    document.querySelectorAll("input").forEach(input=>{

        input.value="";

    });

}

// ===============================
// ATUALIZAR TELA
// ===============================

function atualizarTela(){

    mostrarUltima();

    mostrarEvolucao();

    mostrarHistorico();

}

// ===============================
// ÚLTIMA AVALIAÇÃO
// ===============================

function mostrarUltima(){

    if(medidas.length===0){

        ultimaDiv.innerHTML="<p>Nenhuma avaliação.</p>";

        return;

    }

    const m = medidas[medidas.length-1];

    ultimaDiv.innerHTML=`

<div class="item"><strong>📅 Data:</strong> ${m.data}</div>

<div class="item"><strong>⚖️ Peso:</strong> ${m.peso} kg</div>

<div class="item"><strong>📏 Cintura:</strong> ${m.cintura} cm</div>

<div class="item"><strong>🫃 Abdômen:</strong> ${m.abdomen} cm</div>

<div class="item"><strong>🍑 Quadril:</strong> ${m.quadril} cm</div>

<div class="item"><strong>🍑 Glúteo:</strong> ${m.gluteo} cm</div>

<div class="item"><strong>🦵 Coxa:</strong> ${m.coxa} cm</div>

<div class="item"><strong>🦵 Panturrilha:</strong> ${m.panturrilha} cm</div>

<div class="item"><strong>💪 Braço:</strong> ${m.braco} cm</div>

`;

}

// ===============================
// EVOLUÇÃO
// ===============================

function mostrarEvolucao(){

    if(medidas.length<2){

        evolucaoDiv.innerHTML="<p>Cadastre pelo menos duas avaliações.</p>";

        return;

    }

    const atual=medidas[medidas.length-1];

    const anterior=medidas[medidas.length-2];

    function linha(nome,a,b,unidade){

        const dif=(a-b).toFixed(1);

        const classe=dif>=0 ? "verde" : "vermelho";

        const sinal=dif>0?"+":"";

        return `

<div class="item">

<strong>${nome}</strong>

<span class="${classe}">

${sinal}${dif} ${unidade}

</span>

</div>

`;

    }

    evolucaoDiv.innerHTML=

        linha("⚖️ Peso",atual.peso,anterior.peso,"kg")+

        linha("📏 Cintura",atual.cintura,anterior.cintura,"cm")+

        linha("🫃 Abdômen",atual.abdomen,anterior.abdomen,"cm")+

        linha("🍑 Quadril",atual.quadril,anterior.quadril,"cm")+

        linha("🍑 Glúteo",atual.gluteo,anterior.gluteo,"cm")+

        linha("🦵 Coxa",atual.coxa,anterior.coxa,"cm")+

        linha("🦵 Panturrilha",atual.panturrilha,anterior.panturrilha,"cm")+

        linha("💪 Braço",atual.braco,anterior.braco,"cm");

}

// ===============================
// HISTÓRICO
// ===============================

function mostrarHistorico(){

    historicoDiv.innerHTML="";

    if(medidas.length===0){

        historicoDiv.innerHTML="<p>Nenhuma avaliação salva.</p>";

        return;

    }

    medidas
    .slice()
    .reverse()
    .forEach((m,index)=>{

        historicoDiv.innerHTML+=`

<div class="item">

<strong>${m.data}</strong>

<br><br>

⚖️ ${m.peso} kg

<br>

📏 ${m.cintura} cm

<br>

🍑 ${m.gluteo} cm

<br>

🦵 ${m.coxa} cm

<br><br>

<button onclick="excluirMedida(${medidas.length-1-index})">

🗑 Excluir

</button>

</div>

`;

    });

}

// ===============================
// EXCLUIR
// ===============================

function excluirMedida(indice){

    if(!confirm("Excluir esta avaliação?")){

        return;

    }

    medidas.splice(indice,1);

    salvarDados("medidas",medidas);

    atualizarTela();

}

// ===============================
// INICIAR
// ===============================

atualizarTela();