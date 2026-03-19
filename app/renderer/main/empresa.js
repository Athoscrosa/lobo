const saveButton = document.getElementById('save-button');

saveButton.addEventListener('click', async () => {
    const data = {
        razaoSocial: document.getElementById('razaoSocial').value,
        nomeFantasia: document.getElementById('nomeFantasia').value,
        cnpj: document.getElementById('cnpj').value,
        ie: document.getElementById('ie').value,
    };

    try {
        const result = await window.electronAPI.saveEmpresa(data);
        console.log('Empresa salva com sucesso:', result);

        await Swal.fire({
            title: 'Sucesso!',
            text: 'Empresa salva com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK',
            timer: 2000,
            timerProgressBar: true,
        });

    } catch (error) {
        console.error('Erro ao salvar empresa:', error);
    }
});