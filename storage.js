// ===============================
// STORAGE.JS
// ===============================

// Salva qualquer dado
function salvarDados(chave, dados) {
    localStorage.setItem(chave, JSON.stringify(dados));
}

// Carrega qualquer dado
function carregarDados(chave) {
    const dados = localStorage.getItem(chave);

    if (dados) {
        return JSON.parse(dados);
    }

    return null;
}

// Remove um dado
function removerDados(chave) {
    localStorage.removeItem(chave);
}

// Limpa tudo
function limparTudo() {
    localStorage.clear();
}