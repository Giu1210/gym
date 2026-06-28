// ===============================
// RECORDES
// ===============================

const lista = document.getElementById("listaRecordes");

// Últimas cargas salvas
const cargas = carregarDados("cargas") || {};

// Lista de exercícios
const exercicios = [

    "Agachamento Smith",
    "Leg Press",
    "Cadeira Extensora",
    "Afundo / Passada",
    "Panturrilha",

    "Puxada na Frente",
    "Remada Sentada",
    "Remada Articulada",
    "Rosca Bíceps Máquina",
    "Rosca na Polia",

    "Elevação Pélvica",
    "Abdução",
    "Glúteo no Cabo",
    "Agachamento Sumô",

    "Supino na Máquina",
    "Peck Deck",
    "Tríceps na Polia",
    "Tríceps Banco/Máquina",
    "Elevação Lateral",
    "Supino Inclinado",
    "Tríceps Testa",

    "Mesa Flexora",
    "Stiff",
    "Cadeira Flexora",

    "Desenvolvimento",
    "Elevação Frontal",
    "Crucifixo Invertido",
    "Encolhimento"

];

lista.innerHTML = "";

let existeRecorde = false;

exercicios.forEach(exercicio => {

    if(cargas[exercicio]){

        existeRecorde = true;

        lista.innerHTML += `

        <div class="recorde">

            <h2>🏋️ ${exercicio}</h2>

            <p>

                <strong>Maior carga:</strong>

                ${cargas[exercicio]} kg

            </p>

            <p>

                <strong>Maior volume:</strong>

                Em breve

            </p>

            <p>

                <strong>Maior repetição:</strong>

                Em breve

            </p>

        </div>

        `;

    }

});

if(!existeRecorde){

    lista.innerHTML = `

        <div class="vazio">

            <h2>🏆</h2>

            <br>

            <p>

                Você ainda não possui recordes.

            </p>

            <br>

            <p>

                Salve as cargas dos exercícios para começar.

            </p>

        </div>

    `;

}