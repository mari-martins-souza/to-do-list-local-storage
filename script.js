let botaoNovaTarefa = document.getElementById("botao-nova-tarefa");
let listaTarefas = document.getElementById("lista-tarefas");
let novaAtividade = document.getElementById("nova-atividade");

function salvarTarefasLocalStorage() {
    let li = listaTarefas.children;
    let tarefas = [];

    for (let i = 0; i < li.length; i++) {
        let tarefa = {
            nomeDaTarefa: li[i].querySelector("span").innerText,
            tarefaConcluida: li[i].querySelector('input[type="checkbox"]').checked
        };
        tarefas.push(tarefa);
    }

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefasLocalStorage() {
    let tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (tarefas) {
        for (let i = 0; i < tarefas.length; i++) {
            /*recria os elementos a partir do localStorage
            recria a função da lixeira*/
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = tarefas[i].tarefaConcluida;
            let li = document.createElement("li");
            let iconeLixeira = document.createElement("img");
            iconeLixeira.src = "img/lixeira-x.png"
            iconeLixeira.style.float = "right";
            let span = document.createElement("span");

            span.appendChild(document.createTextNode(tarefas[i].nomeDaTarefa));
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(iconeLixeira);

            if(checkbox.checked) {
                span.style.textDecoration = "line-through";
            } else {
                span.style.textDecoration = "none";
            }

            iconeLixeira.addEventListener("click", function() {
                let confirmacao = confirm("A exclusão não pode ser revertida, tem certeza?");
                if (confirmacao) {
                    this.parentElement.remove();
                    atualizarContador();
                    salvarTarefasLocalStorage();
                }
            });

            checkbox.addEventListener("change", function() {
                if(this.checked) {
                    this.nextSibling.style.textDecoration = "line-through";
                } else {
                    this.nextSibling.style.textDecoration = "none";
                }
                setTimeout(salvarTarefasLocalStorage,0);
            });

            listaTarefas.appendChild(li);
            
            iconeLixeira.className ="icone-lixeira";
            checkbox.className = "checkbox";
        }
    }
    atualizarContador();
}

window.onload = carregarTarefasLocalStorage;

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
                salvarTarefasLocalStorage();   
            }
        });
           
        checkbox.addEventListener("change", function() {
            if(this.checked) {
                this.nextSibling.style.textDecoration = "line-through";
            } else {
                this.nextSibling.style.textDecoration = "none";
            }
            setTimeout(salvarTarefasLocalStorage,0);
        });

        listaTarefas.appendChild(li);
        novaAtividade.value = "";
        atualizarContador();

        iconeLixeira.className ="icone-lixeira";
        checkbox.className = "checkbox";

        salvarTarefasLocalStorage();
    }
});

function atualizarContador() {
    let contador = document.getElementById("contador-texto");
    let listaTarefas = document.getElementById("lista-tarefas");
    contador.innerText = "Tarefas em aberto: " + listaTarefas.children.length;
};


