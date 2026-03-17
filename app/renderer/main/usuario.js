const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contato: document.getElementById('contato').value,
    };

    try {
        const result = await window.electronAPI.saveUsuario(data);
        console.log('Usuario salvo com sucesso:', result);
    } catch (error) {
        console.error('Erro ao salvar usuario:', error);
    }
});