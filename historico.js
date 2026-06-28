// ===============================
// GYM TRACKER
// HISTÓRICO
// ===============================

// Container onde os treinos serão exibidos
const listaHistorico = document.getElementById("listaHistorico");

// Carrega histórico salvo
let historico = carregarDados("historico") || [];

// Exibe os treinos
mostrarHistorico();

// ===============================
// MOSTRAR HISTÓRICO
// ===============================

function mostrarHistorico(){

    listaHistorico.innerHTML = "";

    if(historico.length === 0){

        listaHistorico.innerHTML = `

        <div class="vazio">

            <h2>📭 Nenhum treino encontrado</h2>

            <br>

            <p>
                Quando você concluir um treino,
                ele aparecerá aqui.
            </p>

        </div>

        `;

        return;

    }

    historico
    .slice()
    .reverse()
    .forEach((treino,index)=>{

        listaHistorico.innerHTML += `

        <div class="treino">

            <h2>${treino.treino}</h2>

            <p>

                <strong>📅 Data:</strong>

                ${treino.data}

            </p>

            <p>

                <strong>🏋️ Exercícios:</strong>

                ${treino.exercicios || "--"}

            </p>

            <p>

                <strong>⏱️ Tempo:</strong>

                ${treino.tempo || "--"}

            </p>

            <p>

                <strong>📦 Volume:</strong>

                ${treino.volume || "--"}

            </p>

            <button
                class="detalhes"
                onclick="verDetalhes(${historico.length-1-index})">

                👁 Ver detalhes

            </button>

            <button
                class="detalhes"
                style="margin-top:10px;background:#ef4444"
                onclick="excluirTreino(${historico.length-1-index})">

                🗑 Excluir treino

            </button>

        </div>

        `;

    });

}

// ===============================
// DETALHES
// ===============================

function verDetalhes(indice){

    const treino = historico[indice];

    alert(

`💪 ${treino.treino}

📅 ${treino.data}

🏋️ Exercícios:
${treino.exercicios || "Não informado"}

⏱️ Tempo:
${treino.tempo || "--"}

📦 Volume:
${treino.volume || "--"}`

    );

}

// ===============================
// EXCLUIR TREINO
// ===============================

function excluirTreino(indice){

    const confirmar = confirm(

        "Deseja realmente excluir este treino?"

    );

    if(!confirmar) return;

    historico.splice(indice,1);

    salvarDados("historico",historico);

    mostrarHistorico();

}

// ===============================
// ESTATÍSTICAS
// ===============================

function atualizarEstatisticas(){

    const total = historico.length;

    console.log("Total de treinos:",total);

}

atualizarEstatisticas();