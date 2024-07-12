

  let form = document.getElementById('#cadastroForm')
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();


    let nome = document.getElementById('name').value;
    let endereco = document.getElementById('address').value;
    let numero = document.getElementById('number').value;
    let complemento = document.getElementById('icomplemento').value;
    let bairro = document.getElementById('ibairro').value;
    let cidade = document.getElementById('city').value;
    let uf = document.getElementById('iuf').value;
    let telefone = document.getElementById('phone-number').value;
    let email = document.getElementById('iemail').value;

    let resultado = document.getElementById('res');
    resultado.innerHTML = `
        <p><strong> Nome: </strong> ${nome}</p>
        <p><strong> Endereço: </strong> ${endereco}, ${numero}</p>
        <p><strong> Complemento: </strong> ${complemento}</p>
        <p><strong> Bairro: </strong> ${bairro}</p>
        <p><strong> Cidade: </strong> ${cidade}</p>
        <p><strong> UF: </strong> ${uf}</p>
        <p><strong> Telefone: </strong> ${telefone}</p>
        <p><strong> Email: </strong> ${email}</p>`


        document.getElementById('editarBtn').disabled = false;
});


function clicou() {
    document.getElementById('cadastroForm').reset();
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('editarBtn').disabled = true;
}

document.getElementById('editarBtn').addEventListener('click', function(){
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    document.getElementById('editarBtn').disabled = true;
});
