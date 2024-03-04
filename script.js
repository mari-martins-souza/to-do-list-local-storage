let botaoNovaTarefa = document.getElementById("botao-nova-tarefa");
let listaTarefas = document.getElementById("lista-tarefas");
let novaAtividade = document.getElementById("nova-atividade");

botaoNovaTarefa.addEventListener("click",  function() {
    if (novaAtividade.value !== "") {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        let li = document.createElement("li");
        let iconeLixeira = document.createElement("img");
        iconeLixeira.src = "img/lixeira-x.png"
        iconeLixeira.style.float = "right";
        let span = document.createElement("span");
        
        span.appendChild(document.createTextNode(novaAtividade.value));
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(iconeLixeira);
        
        iconeLixeira.addEventListener("click", function() {
            let confirmacao = confirm("A exclusão não pode ser revertida, tem certeza?");
            if (confirmacao) {
                this.parentElement.remove()   
                atualizarContador();     
            }
        });
           
        checkbox.addEventListener("change", function() {
            if(this.checked) {
                this.nextSibling.style.textDecoration = "line-through";
            } else {
                this.nextSibling.style.textDecoration = "none";
            }
        });

        listaTarefas.appendChild(li);
        novaAtividade.value = "";
        atualizarContador();

        // localStorage.setItem("listaTarefas", listaTarefas.innerHTML);
        // listaTarefas.innerHTML = localStorage.getItem("listaTarefas");

        iconeLixeira.className ="icone-lixeira";
        checkbox.className = "checkbox";
    }
});



function atualizarContador() {
    let contador = document.getElementById("contador-texto");
    let listaTarefas = document.getElementById("lista-tarefas");
    contador.innerText = "Tarefas em aberto: " + listaTarefas.children.length;
};


