// =====================================
// GYM TRACKER
// TREINOS
// =====================================

// ==========================
// BANCO DE TREINOS
// ==========================

const treinos = [

{
    titulo:"🦵 Treino A - Quadríceps",

    exercicios:[

        "Agachamento Smith",
        "Leg Press",
        "Cadeira Extensora",
        "Afundo / Passada",
        "Panturrilha"

    ]

},

{

    titulo:"💪 Treino B - Costas + Bíceps",

    exercicios:[

        "Puxada na Frente",
        "Remada Sentada",
        "Remada Articulada",
        "Rosca Bíceps Máquina",
        "Rosca na Polia"

    ]

},

{

    titulo:"🍑 Treino C - Glúteo",

    exercicios:[

        "Elevação Pélvica",
        "Abdução",
        "Glúteo no Cabo",
        "Agachamento Sumô",
        "Avanço / Passada"

    ]

},

{

    titulo:"🫱 Treino D - Peito + Tríceps",

    exercicios:[

        "Supino na Máquina",
        "Peck Deck",
        "Tríceps na Polia",
        "Tríceps Banco",
        "Elevação Lateral",
        "Supino Inclinado",
        "Tríceps Testa"

    ]

},

{

    titulo:"🦵 Treino E - Posterior",

    exercicios:[

        "Mesa Flexora",
        "Stiff",
        "Cadeira Flexora",
        "Glúteo no Cabo",
        "Abdução"

    ]

},

{

    titulo:"🏋️ Treino F - Ombro",

    exercicios:[

        "Desenvolvimento",
        "Elevação Lateral",
        "Elevação Frontal",
        "Crucifixo Invertido",
        "Encolhimento"

    ]

}

];

// ==========================
// STORAGE
// ==========================

let cargas = carregarDados("cargas") || {};

let concluidos = carregarDados("concluidos") || {};

let historico = carregarDados("historico") || [];

let recordes = carregarDados("recordes") || [];

// ==========================
// TREINO
// ==========================

const container =
document.getElementById("containerTreinos");

const inicioTreino = Date.now();

let volumeTreino = 0;

let exerciciosConcluidos = 0;

// ==========================
// FUNÇÕES AUXILIARES
// ==========================

function salvar(){

    salvarDados("cargas",cargas);

    salvarDados("concluidos",concluidos);

    salvarDados("historico",historico);

    salvarDados("recordes",recordes);

}

function horaAtual(){

    return new Date().toLocaleTimeString("pt-BR",{

        hour:"2-digit",

        minute:"2-digit"

    });

}

function dataAtual(){

    return new Date().toLocaleDateString("pt-BR");

}

function tempoTreino(){

    const minutos =
    Math.floor((Date.now()-inicioTreino)/60000);

    const horas =
    Math.floor(minutos/60);

    return `${horas}h ${minutos%60}min`;

}// =====================================
// PARTE 2
// CRIAR OS TREINOS
// =====================================

treinos.forEach((treino, indiceTreino)=>{

    const card = document.createElement("div");
    card.className = "card";

    // ------------------------
    // Título
    // ------------------------

    const titulo = document.createElement("h2");
    titulo.textContent = treino.titulo;
    card.appendChild(titulo);

    // ------------------------
    // Barra de progresso
    // ------------------------

    const progresso = document.createElement("div");
    progresso.className = "progresso";

    progresso.innerHTML = `

        <div class="progressoTexto">

            <span>Progresso</span>

            <span class="contador">
                0/${treino.exercicios.length}
            </span>

        </div>

        <div class="barra">

            <div class="preenchimento"></div>

        </div>

    `;

    card.appendChild(progresso);

    const contador =
    progresso.querySelector(".contador");

    const barra =
    progresso.querySelector(".preenchimento");

    // ------------------------
    // Lista
    // ------------------------

    const lista = document.createElement("ul");

    treino.exercicios.forEach((nomeExercicio)=>{

        const ultimaCarga =
        cargas[nomeExercicio]
        ? cargas[nomeExercicio] + " kg"
        : "--";

        const li = document.createElement("li");

        li.innerHTML = `

        <div class="info">

            <strong>
                🏋️ ${nomeExercicio}
            </strong>

            <small>

                4 séries • 6–8 repetições

            </small>

            <p class="ultimaCarga">

                Última carga:
                <b>${ultimaCarga}</b>

            </p>

            <input
                class="inputCarga"
                type="number"
                placeholder="Carga de hoje (kg)"
            >

            <div class="timerExercicio">

                <span class="tempo">
                    01:30
                </span>

                <button class="btnTimer">

                    ▶

                </button>

                <button class="btnReset">

                    ↺

                </button>

            </div>

            <label class="check">

                <input
                    type="checkbox"
                    ${concluidos[nomeExercicio] ? "checked" : ""}>

                Exercício concluído

            </label>

        </div>

        <button class="salvarCarga">

            Salvar

        </button>

        `;

        lista.appendChild(li);

    });

    card.appendChild(lista);

    container.appendChild(card);

});// =====================================
// PARTE 3
// FUNCIONALIDADES
// =====================================

document.querySelectorAll(".card").forEach((card)=>{

    const lista = card.querySelector("ul");

    const contador =
    card.querySelector(".contador");

    const barra =
    card.querySelector(".preenchimento");

    // ------------------------
    // Atualizar progresso
    // ------------------------

    function atualizarProgresso(){

        const checks =
        lista.querySelectorAll("input[type='checkbox']");

        const feitos =
        [...checks].filter(c=>c.checked).length;

        contador.textContent =
        `${feitos}/${checks.length}`;

        barra.style.width =
        `${(feitos/checks.length)*100}%`;

    }

    // ------------------------
    // Exercícios
    // ------------------------

    lista.querySelectorAll("li").forEach((li)=>{

        const nome =
        li.querySelector("strong")
        .textContent
        .replace("🏋️ ","");

        const input =
        li.querySelector(".inputCarga");

        const botao =
        li.querySelector(".salvarCarga");

        const ultimaCarga =
        li.querySelector(".ultimaCarga b");

        const checkbox =
        li.querySelector("input[type='checkbox']");

        // ------------------------
        // TIMER
        // ------------------------

        const visor =
        li.querySelector(".tempo");

        const iniciar =
        li.querySelector(".btnTimer");

        const reset =
        li.querySelector(".btnReset");

        let tempo = 90;

        let intervalo = null;

        function atualizarTimer(){

            const min =
            Math.floor(tempo/60);

            const seg =
            tempo%60;

            visor.textContent =
            `${String(min).padStart(2,"0")}:${String(seg).padStart(2,"0")}`;

        }

        atualizarTimer();

        iniciar.onclick=()=>{

            if(intervalo) return;

            iniciar.textContent="⏸";

            intervalo=setInterval(()=>{

                tempo--;

                atualizarTimer();

                if(tempo<=0){

                    clearInterval(intervalo);

                    intervalo=null;

                    iniciar.textContent="▶";

                    alert("⏰ Descanso finalizado!");

                }

            },1000);

        };

        reset.onclick=()=>{

            clearInterval(intervalo);

            intervalo=null;

            tempo=90;

            iniciar.textContent="▶";

            atualizarTimer();

        };

        // ------------------------
        // SALVAR CARGA
        // ------------------------

        botao.onclick=()=>{

            if(input.value===""){

                alert("Digite uma carga.");

                return;

            }

            cargas[nome]=Number(input.value);

            salvarDados("cargas",cargas);

            ultimaCarga.textContent=
            input.value+" kg";

            volumeTreino+=
            Number(input.value)*4*8;

            input.value="";

            botao.textContent="✔";

            setTimeout(()=>{

                botao.textContent="Salvar";

            },1000);

        };

        // ------------------------
        // CHECKBOX
        // ------------------------

        checkbox.onchange=()=>{

            concluidos[nome]=checkbox.checked;

            salvarDados(
                "concluidos",
                concluidos
            );

            if(checkbox.checked){

                li.style.background="#166534";

            }else{

                li.style.background="";

            }

            atualizarProgresso();

        };

    });

    atualizarProgresso();

});// =====================================
// PARTE 4
// FINALIZAR TREINO
// =====================================

document.querySelectorAll(".card").forEach((card)=>{

    const lista = card.querySelector("ul");

    const checks =
    lista.querySelectorAll("input[type='checkbox']");

    function finalizarTreino(){

        const feitos =
        [...checks].filter(c=>c.checked).length;

        // Só finaliza quando todos estiverem concluídos
        if(feitos !== checks.length){

            return;

        }

        const titulo =
        card.querySelector("h2").textContent;

        const hoje =
        new Date();

        const data =
        hoje.toLocaleDateString("pt-BR");

        const hora =
        hoje.toLocaleTimeString("pt-BR",{

            hour:"2-digit",

            minute:"2-digit"

        });

        const minutos =
        Math.floor((Date.now()-inicioTreino)/60000);

        const horas =
        Math.floor(minutos/60);

        const tempo =

        `${horas}h ${minutos%60}min`;

        // Evita salvar duas vezes no mesmo dia

        const existe =
        historico.find(item=>

            item.treino===titulo &&

            item.data===data

        );

        if(existe){

            return;

        }

        historico.push({

            treino:titulo,

            data:data,

            hora:hora,

            exercicios:checks.length,

            concluidos:feitos,

            tempo:tempo,

            volume:volumeTreino+" kg"

        });

        salvarDados(

            "historico",

            historico

        );

        // =====================
        // RECORDES
        // =====================

        Object.keys(cargas).forEach(exercicio=>{

            const cargaAtual =
            Number(cargas[exercicio]);

            const antigo =
            recordes.find(r=>

                r.exercicio===exercicio

            );

            if(!antigo){

                recordes.push({

                    exercicio:exercicio,

                    carga:cargaAtual

                });

            }else if(cargaAtual>antigo.carga){

                antigo.carga=cargaAtual;

            }

        });

        salvarDados(

            "recordes",

            recordes

        );

        alert(

`🎉 PARABÉNS!

Você concluiu:

${titulo}

⏱ Tempo:
${tempo}

📦 Volume:
${volumeTreino} kg`

        );

    }

    checks.forEach(check=>{

        check.addEventListener(

            "change",

            finalizarTreino

        );

    });

});// =====================================
// PARTE 5
// MELHORIAS FINAIS
// =====================================

// -------------------------
// FAVORITOS
// -------------------------

let favoritos = carregarDados("favoritos") || [];

document.querySelectorAll(".card li").forEach((li)=>{

    const nome = li.querySelector("strong")
        .textContent
        .replace("🏋️ ","");

    const estrela = document.createElement("button");

    estrela.className = "favorito";

    estrela.style.marginTop = "10px";

    estrela.style.padding = "8px";

    estrela.style.background = "transparent";

    estrela.style.border = "none";

    estrela.style.cursor = "pointer";

    estrela.style.fontSize = "22px";

    estrela.textContent =
        favoritos.includes(nome) ? "⭐" : "☆";

    li.querySelector(".info").appendChild(estrela);

    estrela.onclick = ()=>{

        if(favoritos.includes(nome)){

            favoritos =
            favoritos.filter(e=>e!==nome);

            estrela.textContent="☆";

        }else{

            favoritos.push(nome);

            estrela.textContent="⭐";

        }

        salvarDados(
            "favoritos",
            favoritos
        );

    };

});

// -------------------------
// OBSERVAÇÕES
// -------------------------



// -------------------------
// EVOLUÇÃO DE CARGA
// -------------------------

document.querySelectorAll(".card li").forEach((li)=>{

    const nome =
    li.querySelector("strong")
    .textContent
    .replace("🏋️ ","");

    const ultima =
    Number(cargas[nome] || 0);

    const atual =
    li.querySelector(".inputCarga");

    atual.addEventListener("input",()=>{

        const valor =
        Number(atual.value);

        let texto = "";

        if(valor>ultima){

            texto =
            `📈 +${valor-ultima} kg`;

        }

        else if(valor<ultima){

            texto =
            `📉 ${valor-ultima} kg`;

        }

        else{

            texto =
            "➡ Mesmo peso";

        }

        let evolucao =
        li.querySelector(".evolucao");

        if(!evolucao){

            evolucao =
            document.createElement("p");

            evolucao.className =
            "evolucao";

            evolucao.style.marginTop =
            "8px";

            li.querySelector(".info")
            .appendChild(evolucao);

        }

        evolucao.textContent = texto;

    });

});

// -------------------------
// ANIMAÇÃO
// -------------------------

document.querySelectorAll(".card")
.forEach((card,i)=>{

    card.style.opacity="0";

    card.style.transform=
    "translateY(25px)";

    setTimeout(()=>{

        card.style.transition=
        ".5s";

        card.style.opacity="1";

        card.style.transform=
        "translateY(0)";

    },i*120);

});

console.log("✅ Gym Tracker carregado!");