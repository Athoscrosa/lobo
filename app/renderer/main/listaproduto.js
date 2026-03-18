const { Column } = require("drizzle-orm");

const table = new DataTable("#tabela-produto", {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax: async (data, callback) => {
        const filter = {
            term: data?.search?.value,             //termo da pesquisa
            limit: data?.length,                 //Limite de registros a ser selecionado do banco
            offset: data?.start,                   // A pesquisa inicia no registro Ex: 5, 10
            orderType: data?.order[0]?.dir,              // tipo de ordenação (asc ou desc)
            column: data?.order[0]?.column         //coluna a ser filtrada
        }
        try {
            const response = await window.electronAPI.searchProducts(filter);
            callback({
                draw: response?.draw ?? data?.draw ?? 0, //Número de requisição para o servidor (usado para controle de concorrência)
                recordsTotal: response?.recordsTotal ?? 0, //Total de registros sem filtro
                recordsFiltered: response?.recordsFiltered ?? 0, //Total de registros com filtro
                data: response?.data ?? [], //Dados da página atual
            });
        } catch (error) {
            console.error('Restrição: ${error.message}');
            callback({
                draw: 0,
                recordsTotal: 0,
                recordsFiltered: 0,
                data: []
            })
        }
    },
    columns: [
        { data: "codigo", name: "codigo" },
        { data: "nome", name: "nome" },
        { data: "price", name: "Preço de Venda" }
    ]
});




const voltarButton = document.getElementById('voltar-button');
const cadastroButton = document.getElementById('cadastro-button');

voltarButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.goHome();
    } catch (error) {
        console.error('Erro ao abrir a janela principal:', error);
    }
});

cadastroButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('produto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de cadastro de produtos:', error);
    }
});