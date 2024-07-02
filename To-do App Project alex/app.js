const dateTracker = document.querySelector("#dateTracker");
const tasksTracker = document.querySelector("#tasksTracker");
const listItemsContainer = document.querySelector("#listGroup");
const newItemInputTitle = document.querySelector("#newItemInputTitle")
const newItemInput = document.querySelector("#newItemInput");
const addItemButton = document.querySelector("#addNewItemButton");
const editItemButton = document.querySelector("deleteListItemButton");

formatDate();

let tasksArr = [];
let taskIdCounter = 1

addItemButton.addEventListener("click",handleAddListItem);


function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; 
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
};
function formatDate() {
    const date = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const dayWithSuffix = day + getOrdinalSuffix(day);

    dateTracker.textContent = `${month}, ${dayWithSuffix}`;
};

function handleAddListItem() {
    let task = {
        id: taskIdCounter,
        dateCreated: new Date(),
        taskTitle: newItemInputTitle.value,
        taskItself: newItemInput.value,
    };
    tasksArr.push(task);
    listItemsContainer.innerHTML += 
        `
            <div id="${task.id}" class="list-group-item">
                <div class="lead">
                    <p class="theTask">
                        <bold>${task.taskTitle} &#8594;</bold> 
                        <span>${task.taskItself}</span>
                    </p> 
                </div>
                <div class="float-end">
                    <button onClick="handleDeleteListItem(event)">
                        <img src="assets/trash-bin.png" alt="Bin icon">
                    </button>
                    <button onClick="handleEditListItem(event)" >
                        <img src="assets/edit.png" alt="Edit icon">
                    </button>
                </div>
            </div>
        `;
    tasksTracker.textContent = `${tasksArr.length} Active tasks`
    newItemInput.value = "" 
    newItemInputTitle.value = "" 
    taskIdCounter++ 
    
};

function handleDeleteListItem(event){
    let filteredArr = tasksArr.filter((task) => {
        return task.id !== parseInt(event.target.closest("div").parentElement.id);
    });
    tasksArr = filteredArr;
    listItemsContainer.innerHTML = "";
    tasksArr.forEach((task)=>{
        listItemsContainer.innerHTML += 
            `
                <div id="${task.id}" class="list-group-item">
                    <div class="lead">
                        <p class="theTask">
                            <bold>${task.taskTitle} &#8594;</bold> 
                            <span>${task.taskItself}</span>
                        </p> 
                    </div>
                    <div class="float-end">
                        <button onClick="handleDeleteListItem(event)">
                            <img src="assets/trash-bin.png" alt="Bin icon">
                        </button>
                        <button onClick="handleEditListItem(event)">
                            <img src="assets/edit.png" alt="Edit icon">
                        </button>
                    </div>
                </div>
            `
    });
    
    tasksTracker.textContent = `${tasksArr.length} Active tasks`;
    taskIdCounter--;
};

function handleEditListItem(event){
    let thisTask = event.target.closest("div").parentElement.children[0].children[0].children[1]
    let theText = thisTask.textContent
    thisTask.innerHTML = `<input id="taskEditor" class="task-editor" value="${theText}"><button onclick="handleEditPrint()">click</button>`
    

};

function handleEditPrint(){
    let thisTask = event.target.closest("div").parentElement.children[0].children[0].children[1]
    let editedText = document.querySelector("#taskEditor")
    thisTask.innerHTML = `<span>${editedText.value}</span>`
}

function handleFilterByDate(){

};

function handleFilterByTitle(){

};