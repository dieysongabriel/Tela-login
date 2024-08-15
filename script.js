

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const btnSalvar = document.getElementById('salvar');
    const btnLimpar = document.getElementById('limparBtn');
    const btnVerLista = document.getElementById('verListaBtn');
    const btnEditar = document.getElementById('editarBtn');
    const res = document.querySelector('.res');
    const lista = document.querySelector('.lista');
    let editIndex = -1;

    const validateForm = () => {
        const email = form.complemento.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            mostrarMensagem('Por favor, insira um endereço de e-mail válido.');
            return false;
        }

        return true;
    };


    //Função para validar os campos de formulário
    const validarCampos = () => {
        const campos = [
            form.nome.value,
            form.endereco.value,
            form.cidade.value,
            form.uf.value,
            form.telefone.value,
            
        ];

        return campos.every(campo => campo.trim()  !== '');
    };

    

    // Função para salvar os dados do formulário
    const salvarDados = (event) => {
        event.preventDefault();

        if(!validarCampos()) {
            mostrarMensagem('Por favor, preencha todos os campos.');
            return; // Não prosseguir se algum campo estiver vazio
        }
        if(!validateForm()) {
            return; //Não prosseguir se a validaçao falhar
        }
        
        
        const dados = {
            nome: form.nome.value,
            endereco: form.endereco.value,
            numero: form.numero.value,
            bairro: form.bairro.value,
            cidade: form.cidade.value,
            uf: form.uf.value,
            telefone: form.telefone.value,
            email: form.complemento.value
        };
        
        let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        
        if (editIndex === -1) {
            cadastros.push(dados);
        }else {
            cadastros[editIndex] = dados;
            editIndex = -1;
            btnEditar.disabled = true;
        }

        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        form.reset();
        mostrarMensagem('Dados salvos com sucesso!');
        
    };

    // Função para limpar o formulário
    const limparFormulario = () => {
        form.reset();
        editIndex = -1;
        btnEditar.disabled = true;
        mostrarMensagem('Formulário limpo.');
    };

    // Função para ver a lista de cadastros
    const verLista = () => {
        const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
        lista.innerHTML = '<h2>Lista de Cadastros</h2>';

        cadastros.forEach((cadastro, index) => {
            const div = document.createElement('div');
            div.classList.add('cadastro-item');
            div.innerHTML = `
                <p>Nome: ${cadastro.nome}</p>
                <p>Endereço: ${cadastro.endereco}, Número: ${cadastro.numero}</p>
                <p>Complemento: ${cadastro.complemento}</p>
                <p>Bairro: ${cadastro.bairro}</p>
                <p>Cidade: ${cadastro.cidade} - UF: ${cadastro.uf}</p>
                <p>Telefone: ${cadastro.telefone}</p>
                <p>Email: ${cadastro.email}</p>
                <button onclick="editarCadastro(${index})">Editar</button>
                <button onclick="deletarCadastro(${index})">Deletar</button>
            `;
            lista.appendChild(div);
        });
    };

    // Função para editar um cadastro
    const editarCadastro = (index) => {
        const cadastros = JSON.parse(localStorage.getItem('cadastros'));
        const cadastro = cadastros[index];

        form.nome.value = cadastro.nome;
        form.endereco.value = cadastro.endereco;
        form.numero.value = cadastro.numero;
        form.complemento.value = cadastro.complemento;
        form.bairro.value = cadastro.bairro;
        form.cidade.value = cadastro.cidade;
        form.uf.value = cadastro.uf;
        form.telefone.value = cadastro.telefone;
        form.email.value = cadastro.email;

        editIndex = index;
        btnEditar.disabled = false;
    };

    // Função para deletar um cadastro
    const deletarCadastro = (index) => {
        let cadastros = JSON.parse(localStorage.getItem('cadastros'));
        cadastros.splice(index, 1);
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        verLista();
        mostrarMensagem('Cadastro deletado com sucesso!');
    };

    // Função para mostrar mensagens
    const mostrarMensagem = (mensagem) => {
        res.textContent = mensagem;
        setTimeout(() => {
            res.textContent = '';
        }, 3000);
    };

    btnSalvar.addEventListener('click', salvarDados);
    btnLimpar.addEventListener('click', limparFormulario);
    btnVerLista.addEventListener('click', verLista);

    // Tornar as funções de editar e deletar globais
    window.editarCadastro = editarCadastro;
    window.deletarCadastro = deletarCadastro;
});
document.getElementById('telefone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9 ()]/g, '');
});



