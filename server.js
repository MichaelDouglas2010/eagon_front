function atualizarUsuarios() {
    // Limpa a lista de usuarios
    document.getElementById('listaUsuarios').innerHTML = ''
    // Faz uma requisição Fetch para o endereço https://eagon-projec.onrender.com/usuarios
    // e retorna um array de objetos JSON
    const usuarios = fetch('https://eagon-projec.onrender.com/usuarios')
        .then(resposta => resposta.json())
        .then(usuarios => {
            // Para cada objeto JSON do array
            // cria um elemento <li> e adiciona ao <ul id="listaUsuarios">        
            usuarios.forEach(usuario => {
                const li = document.createElement('li')
                li.textContent = `${usuario.nome} - ${usuario.email}  - ${usuario.telefone}  - ${usuario.tipo}`
                // Adiciona um botão de excluir para cada usuario
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger m-1'
                botaoExcluir.addEventListener('click', () => deleteUsuario(usuario.id))
                li.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada usuario
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning m-1'
                botaoAtualizar.addEventListener('click', () => showUsuario(usuario))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaUsuarios').appendChild(li)
            })
        })
}

function showUsuario(usuario) {
    document.getElementById('nomeUpdate').value = usuario.nome
    document.getElementById('emailUpdate').value = usuario.email
    document.getElementById('telefoneUpdate').value = usuario.telefone
    document.getElementById('idUpdate').value = usuario.id
    document.getElementById('tipoUpdate').value = usuario.tipo  // jsfdhdsfvbh//
    document.getElementById('btnUpdate').disabled = false
}

function deleteUsuario(id) {
    fetch(`https://eagon-projec.onrender.com/usuarios/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir usuario!')
        }
        alert('Usuario excluído com sucesso!')
        atualizarUsuarios()
    })
}

atualizarUsuarios()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarUsuario(event)
});

function cadastrarUsuario(form) {
    const usuario = {
        nome: form.target.nome.value,
        email: form.target.email.value,
        telefone: form.target.telefone.value,
        tipo: form.target.tipo.value //sdjfhuidhgiuerhifgjw//
    }

    fetch('https://eagon-projec.onrender.com/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar usuario!')
        }
        alert('Usuario cadastrado com sucesso!')
        form.target.reset()
        atualizarUsuarios()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarUsuario(event)
});

function atualizarUsuario(form) {
    const usuario = {
        nome: form.target.nomeUpdate.value,
        email: form.target.emailUpdate.value,
        telefone: form.target.telefoneUpdate.value,
        tipo: form.target.tipoUpdate.value
    }

    fetch(`https://eagon-projec.onrender.com/usuarios/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar usuario!')
        }
        alert('Usuario atualizado com sucesso!')
        form.target.reset()
        atualizarUsuarios()
        document.getElementById('btnUpdate').disabled = true
    })
}