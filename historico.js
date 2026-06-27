const container = document.getElementById("historico");

const cargas = carregarDados("cargas") || {};

const exercicios = Object.keys(cargas);

if(exercicios.length === 0){

    container.innerHTML = `

        <div class="card">

            <h2>Nenhum treino registrado</h2>

            <p>Quando você salvar uma carga, ela aparecerá aqui.</p>

        </div>

    `;

}else{

    exercicios.forEach(exercicio=>{

        const card=document.createElement("div");

        card.className="card";

        card.innerHTML=`

            <h2>${exercicio}</h2>

            <p><strong>Última carga:</strong> ${cargas[exercicio]} kg</p>

            <p>${new Date().toLocaleDateString('pt-BR')}</p>

        `;

        container.appendChild(card);

    });

}