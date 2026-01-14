const inputBox = document.getElementById("input-box");
const listontainer = document.getElementById("list-container");

function addTask(){
    const task = inputBox.value.trim();

    if (!task) {
        alert("Debes escribir algo!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = task;
    listontainer.appendChild(li);

    inputBox.value = "";

    let span = document.createElement("span")
    span.textContent = "\u00d7";
    li.appendChild(span);

    span.classList.add("delete-btn");

    showMessage();
    saveData();
}

listontainer.addEventListener("click", (e) => {
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    } else if (e.target.classList.contains("delete-btn")){
        e.target.parentElement.remove();
        showMessage();
        saveData();
    }
});

const emptyMessage = document.createElement("p");
emptyMessage.textContent = "No tienes tareas pendientes";
emptyMessage.className = "message";

listontainer.parentElement.appendChild(emptyMessage);

function showMessage(){
    emptyMessage.style.display = listontainer.children.length === 0 ? "block" : "none";
}

function saveData(){
    localStorage.setItem("data", listontainer.innerHTML)
}

function showTask(){
    listontainer.innerHTML = localStorage.getItem("data");
    showMessage();
}

document.addEventListener("keydown", (e) => {
    if (event.key === "Enter") {
        addTask();
    }
});

showTask();