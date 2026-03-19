const productButton = document.getElementById('product-button');
const clienteButton = document.getElementById('cliente-button');
const usuarioButton = document.getElementById('usuario-button');
const empresaButton = document.getElementById('empresa-button');
const vendaButton = document.getElementById('venda-button');

productButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaproduto.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de produtos:', error);
    }
});

clienteButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listacliente.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de cliente:', error);
    }
});

usuarioButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listausuario.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de usuario:', error);
    }
});

empresaButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('listaempresa.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de empresa:', error);
    }
});

vendaButton.addEventListener('click', async () => {
    try {
        if (!window.electronAPI || typeof window.electronAPI.openPage !== 'function') {
            throw new Error('API do Electron não foi injetada pelo preload');
        }
        await window.electronAPI.openPage('venda.html');
    } catch (error) {
        console.error('Erro ao abrir a janela de venda:', error);
    }
});