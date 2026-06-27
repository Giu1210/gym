// ===================================
// GYM TRACKER - TREINOS
// Parte 1
// ===================================

// ---------- TREINOS ----------

const treinos = [
{
    titulo: "🦵 Treino A - Quadríceps",
    exercicios: [
        "Agachamento Smith",
        "Leg Press",
        "Cadeira Extensora",
        "Afundo / Passada",
        "Panturrilha"
    ]
},
{
    titulo: "💪 Treino B - Costas + Bíceps",
    exercicios: [
        "Puxada na Frente",
        "Remada Sentada",
        "Remada Articulada",
        "Rosca Bíceps Máquina",
        "Rosca na Polia"
    ]
},
{
    titulo: "🍑 Treino C - Glúteo",
    exercicios: [
        "Elevação Pélvica",
        "Abdução",
        "Glúteo no Cabo",
        "Agachamento Sumô",
        "Avanço / Passada"
    ]
},
{
    titulo: "🫱 Treino D - Peito + Tríceps",
    exercicios: [
        "Supino na Máquina",
        "Peck Deck",
        "Tríceps na Polia",
        "Tríceps Banco/Máquina",
        "Elevação Lateral",
        "Supino Inclinado",
        "Tríceps Testa"
    ]
},
{
    titulo: "🦵 Treino E - Posterior de Coxa",
    exercicios: [
        "Mesa Flexora",
        "Stiff",
        "Cadeira Flexora",
        "Glúteo no Cabo",
        "Abdução (leve)"
    ]
},
{
    titulo: "🏋️ Treino F - Ombro Completo",
    exercicios: [
        "Desenvolvimento",
        "Elevação Lateral",
        "Elevação Frontal",
        "Crucifixo Invertido",
        "Encolhimento"
    ]
}
];

// ---------- LOCAL STORAGE ----------

const cargas = carregarDados("cargas") || {};
const concluidos = carregarDados("concluidos") || {};

// ---------- CONTAINER ----------

const container = document.getElementById("containerTreinos");

// ---------- CRIAR TREINOS ----------

treinos.forEach((treino, indiceTreino) => {

    const card = document.createElement("div");
    card.className = "card";

    // Título

    const titulo = document.createElement("h2");
    titulo.textContent = treino.titulo;

    card.appendChild(titulo);

    // Barra de progresso

    const progresso = document.createElement("div");
    progresso.className = "progresso";

    progresso.innerHTML = `
        <div class="progressoTexto">
            <span>Progresso</span>
            <span class="contador">0/${treino.exercicios.length}</span>
        </div>

        <div class="barra">
            <div class="preenchimento"></div>
        </div>
    `;

    card.appendChild(progresso);

    const contador = progresso.querySelector(".contador");
    const preenchimento = progresso.querySelector(".preenchimento");

    // Lista

    const lista = document.createElement("ul");

    treino.exercicios.forEach((exercicio) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div style="flex:1">

                <strong>🏋️ ${exercicio}</strong><br>

                <small>4 séries • 6–8 repetições</small>

                <br><br>

                <p class="ultimaCarga">
                    Última carga:
                    <b>${cargas[exercicio] ? cargas[exercicio] + " kg" : "--"}</b>
                </p>

                <input
                    class="inputCarga"
                    type="number"
                    placeholder="Carga de hoje (kg)"
                >

                <br><br>

                <label class="check">

                    <input
                        type="checkbox"
                        ${concluidos[exercicio] ? "checked" : ""}>

                    Exercício concluído

                </label>

            </div>

            <button>Salvar</button>
        `;

        lista.appendChild(li);

    });

    card.appendChild(lista);

    container.appendChild(card);

});// ===================================
// PARTE 2
// Funcionalidades
// ===================================

document.querySelectorAll(".card").forEach((card) => {

    const lista = card.querySelector("ul");

    const contador = card.querySelector(".contador");

    const barra = card.querySelector(".preenchimento");

    function atualizarProgresso(){

        const checks = lista.querySelectorAll("input[type='checkbox']");

        const feitos = [...checks].filter(c=>c.checked).length;

        contador.textContent = `${feitos}/${checks.length}`;

        barra.style.width = `${(feitos/checks.length)*100}%`;

    }

    lista.querySelectorAll("li").forEach((li)=>{

        const nome = li.querySelector("strong").textContent.replace("🏋️ ","");

        const input = li.querySelector(".inputCarga");

        const botao = li.querySelector("button");

        const ultimaCarga = li.querySelector(".ultimaCarga b");

        const checkbox = li.querySelector("input[type='checkbox']");

        // Carrega última carga

        if(cargas[nome]){

            ultimaCarga.textContent = cargas[nome] + " kg";

        }

        // Cor do exercício

        if(concluidos[nome]){

            li.style.background="#166534";

        }

        // Salvar carga

        botao.onclick=()=>{

            if(input.value===""){

                alert("Digite a carga.");

                return;

            }

            cargas[nome]=input.value;

            salvarDados("cargas",cargas);

            ultimaCarga.textContent=input.value+" kg";

            input.value="";

            botao.textContent="✔ Salvo";

            setTimeout(()=>{

                botao.textContent="Salvar";

            },1000);

        };

        // Checkbox

        checkbox.onchange=()=>{

            concluidos[nome]=checkbox.checked;

            salvarDados("concluidos",concluidos);

            if(checkbox.checked){

                li.style.background="#166534";

            }else{

                li.style.background="#334155";

            }

            atualizarProgresso();

        };

    });

    atualizarProgresso();

});// ===================================
// PARTE 3
// Histórico e conclusão
// ===================================

document.querySelectorAll(".card").forEach((card, indice) => {

    const lista = card.querySelector("ul");
    const checks = lista.querySelectorAll("input[type='checkbox']");

    function verificarTreinoConcluido() {

        const feitos = [...checks].filter(c => c.checked).length;

        if (feitos !== checks.length) return;

        let historico = carregarDados("historico") || [];

        const hoje = new Date().toLocaleDateString("pt-BR");

        const titulo = card.querySelector("h2").textContent;

        const jaExiste = historico.find(item =>
            item.treino === titulo &&
            item.data === hoje
        );

        if (!jaExiste) {

            historico.push({

                treino: titulo,

                data: hoje

            });

            salvarDados("historico", historico);

            setTimeout(() => {

                alert("🎉 Parabéns!\n\nVocê concluiu o " + titulo + "!");

            }, 300);

        }

    }

    checks.forEach(check => {

        check.addEventListener("change", verificarTreinoConcluido);

    });

});