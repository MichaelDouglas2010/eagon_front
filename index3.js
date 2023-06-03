function atualizarProjetos() {
    // Limpa a lista de projetos
    document.getElementById('listaProjetos').innerHTML = ''
    // Faz uma requisição Fetch para o endereço https://eagon-projec.onrender.com/projetos
    // e retorna um array de objetos JSON
    const usuarios = fetch('https://eagon-projec.onrender.com/projetos')
        .then(resposta => resposta.json())
        .then(projetos => {
            // Para cada objeto JSON do array
            // cria um elemento <li> e adiciona ao <ul id="listaProjetos">        
            projetos.forEach(projeto => {
                const li = document.createElement('li')
                li.textContent = `${projeto.nome} - ${projeto.local}  `
                // Adiciona um botão de excluir para cada projeto
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger m-1'
                botaoExcluir.addEventListener('click', () => deleteProjeto(projeto.id))
                li.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada projeto
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning m-1'
                botaoAtualizar.addEventListener('click', () => showProjeto(projeto))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaProjetos').appendChild(li)
            })
        })
}

function showProjeto(projeto) {
    document.getElementById('nomeUpdate').value = projeto.nome
    document.getElementById('localUpdate').value = projeto.local
    document.getElementById('idUpdate').value = projeto.id
    document.getElementById('btnUpdate').disabled = false
}

function deleteProjeto(id) {
    fetch(`https://eagon-projec.onrender.com/projetos/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir projeto!')
        }
        alert('Projeto excluído com sucesso!')
        atualizarProjetos()
    })
}

atualizarProjetos()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarProjeto(event)
});

function cadastrarProjeto(form) {
    const projeto = {
        nome: form.target.nome.value,
        local: form.target.local.value
    }

    fetch('https://eagon-projec.onrender.com/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projeto)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar projeto!')
        }
        alert('Projeto cadastrada com sucesso!')
        form.target.reset()
        atualizarProjetos()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarProjeto(event)
});

function atualizarProjeto(form) {
    const projeto = {
        nome: form.target.nomeUpdate.value,
        local: form.target.localUpdate.value
    }

    fetch(`https://eagon-projec.onrender.com/projetos/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projeto)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar projeto!')
        }
        alert('Projeto atualizado com sucesso!')
        form.target.reset()
        atualizarProjetos()
        document.getElementById('btnUpdate').disabled = true
    })
}