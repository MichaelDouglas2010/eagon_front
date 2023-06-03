function atualizarTarefas() {
    // Limpa a lista de tarefas
    document.getElementById('listaTarefas').innerHTML = ''
    // Faz uma requisição Fetch para o endereço https://eagon-projec.onrender.com/tarefas
    // e retorna um array de objetos JSON
    const usuarios = fetch('https://eagon-projec.onrender.com/tarefas')
        .then(resposta => resposta.json())
        .then(tarefas => {
            // Para cada objeto JSON do array
            // cria um elemento <li> e adiciona ao <ul id="listaTarefas">        
            tarefas.forEach(tarefa => {
                const li = document.createElement('li')
                li.textContent = `${tarefa.nome} - ${tarefa.dataInicio}  - ${tarefa.dataFim} `
                // Adiciona um botão de excluir para cada tarefa
                const botaoExcluir = document.createElement('button')
                botaoExcluir.textContent = 'Excluir'
                botaoExcluir.className = 'btn btn-danger m-1'
                botaoExcluir.addEventListener('click', () => deleteTarefa(tarefa.id))
                li.appendChild(botaoExcluir)

                // Adiciona um botão de atualizar para cada tarefa
                const botaoAtualizar = document.createElement('button')
                botaoAtualizar.textContent = 'Atualizar'
                botaoAtualizar.className = 'btn btn-warning m-1'
                botaoAtualizar.addEventListener('click', () => showTarefa(tarefa))
                li.appendChild(botaoAtualizar)

                document.getElementById('listaTarefas').appendChild(li)
            })
        })
}

function showTarefa(tarefa) {
    document.getElementById('nomeUpdate').value = tarefa.nome
    document.getElementById('dataInicioUpdate').value = tarefa.dataInicio
    document.getElementById('dataFimUpdate').value = tarefa.dataFim
    document.getElementById('idUpdate').value = tarefa.id
    document.getElementById('btnUpdate').disabled = false
}

function deleteTarefa(id) {
    fetch(`https://eagon-projec.onrender.com/tarefas/${id}`, {
        method: 'DELETE'
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao excluir tarefa!')
        }
        alert('Tarefa excluída com sucesso!')
        atualizarTarefas()
    })
}

atualizarTarefas()

document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault()
    cadastrarTarefa(event)
});

function cadastrarTarefa(form) {
    const tarefa = {
        nome: form.target.nome.value,
        dataInicio: form.target.dataInicio.value,
        dataFim: form.target.dataFim.value
    }

    fetch('https://eagon-projec.onrender.com/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    }).then(resposta => {
        if (resposta.status != 200 && resposta.status != 201) {
            alert('Erro ao cadastrar tarefa!')
        }
        alert('Tarefa cadastrada com sucesso!')
        form.target.reset()
        atualizarTarefas()
    })
}

document.getElementById("formUpdate").addEventListener("submit", function (event) {
    event.preventDefault()
    atualizarTarefa(event)
});

function atualizarTarefa(form) {
    const tarefa = {
        nome: form.target.nomeUpdate.value,
        dataInicio: form.target.dataInicioUpdate.value,
        dataFim: form.target.dataFimUpdate.value
    }

    fetch(`https://eagon-projec.onrender.com/tarefas/${form.target.idUpdate.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tarefa)
    }).then(resposta => {
        if (resposta.status != 200) {
            alert('Erro ao atualizar tarefa!')
        }
        alert('Tarefa atualizado com sucesso!')
        form.target.reset()
        atualizarTarefas()
        document.getElementById('btnUpdate').disabled = true
    })
}