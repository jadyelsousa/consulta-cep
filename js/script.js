const cepForm = document.getElementById('cepForm');
const cepInput = document.getElementById('cep');
const cepResult = document.getElementById('cepResult');
const logradouroResult = document.getElementById('logradouroResult');
const bairroResult = document.getElementById('bairroResult');
const cidadeResult = document.getElementById('cidadeResult');
const estadoResult = document.getElementById('estadoResult');
const resultDiv = document.getElementById('result');

cepForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const cleanedCep = cepInput.value.replace(/\D/g, '');

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
        if (!response.ok) {
            throw new Error('Erro ao consultar o CEP. Verifique se o CEP é válido.');
        }
        const data = await response.json();

        if (data.cep) {
            cepResult.textContent = data.cep;
            logradouroResult.textContent = data.logradouro || '-';
            bairroResult.textContent = data.bairro || '-';
            cidadeResult.textContent = data.localidade || '-';
            estadoResult.textContent = data.uf || '-';

            resultDiv.style.display = 'block';
        } else {
            alert('CEP não encontrado.');
            resultDiv.style.display = 'none';
        }
    } catch (error) {
        alert(error.message);
        resultDiv.style.display = 'none';
    }
});