const dateTracker = document.querySelector("#dateTracker");
const tasksTracker = document.querySelector("#tasksTracker");
const listItemsContainer = document.querySelector("#listGroup");
const newItemInputTitle = document.querySelector("#newItemInputTitle");
const newItemInput = document.querySelector("#newItemInput");
const filterDisplayButton = document.querySelector("#filterMenuButton");
const addItemButton = document.querySelector("#addNewItemButton");

const sortAlphabeticalyAZ = document.querySelector("#sortAZButton");
const sortAlphabeticalyZA = document.querySelector("#sortZAButton");
const sortByDateNewOld = document.querySelector("#sortDateButtonNewOld");
const sortByDateOldNew = document.querySelector("#sortDateButtonOldNew");
const searchTitleInput = document.querySelector("#inputSearchTitle");
const searchTitleButton = document.querySelector("#buttonSearchTitle");
const searchDateInput = document.querySelector("#inputSearchDate");
const searchDateButton = document.querySelector("#buttonSearchDate");
const resetFiltersButton = document.querySelector("#buttonReset");


formatDate();
console.log(new Date())
let tasksArr = [];
let taskIdCounter = 1;

addItemButton.addEventListener("click", handleAddListItem);
filterDisplayButton.addEventListener("click", handleToggleFiltersMenu);
sortAlphabeticalyAZ.addEventListener("click", handleSortAlphabeticalyAZ);
sortAlphabeticalyZA.addEventListener("click", handleSortAlphabeticalyZA);
sortByDateNewOld.addEventListener("click", handleSortByDateNewOld);
sortByDateOldNew.addEventListener("click", handleSortByDateOldNew);
resetFiltersButton.addEventListener("click", handleResetFitlers);
searchTitleButton.addEventListener("click", handleSearchByTitle);
searchDateButton.addEventListener("click", handleSearchByDate)


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

/// Task Creation, edditing, deleting Functions///
//Creation
function updateHTML(task){
    listItemsContainer.innerHTML += 
                `
                    <div id="${task.id}" class="list-group-item">
                        <div class="lead">
                            <p class="theTask">
                                <strong>${task.taskTitle} &#8594;</strong> 
                                <span>${task.taskItself}</span>
                            </p> 
                        </div>
                        <div class="float-end">
                            <button onClick="handleDeleteListItem(event)">
                                <img src="assets/trash-bin.png" alt="Bin icon">
                            </button>
                            <button class="editButton" onClick="handleEditListItem(event)">
                                <img src="assets/edit.png" alt="Edit icon">
                            </button>
                        </div>
                    </div>
                `;
};

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasksArr'));
    if (savedTasks) {
        tasksArr = savedTasks;
        tasksArr.forEach(task => updateHTML(task));
        tasksTracker.textContent = `${tasksArr.length} Active tasks`;
    }
    const savedTaskIdCounter = localStorage.getItem('taskIdCounter');
    if (savedTaskIdCounter) {
        taskIdCounter = parseInt(savedTaskIdCounter, 10);
    } else {
        taskIdCounter = 1; // Default value if nothing is in local storage
    }
}
// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
    localStorage.setItem('taskIdCounter', taskIdCounter);
}
// Call loadTasks when the page loads to load saved tasks
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();  
});
function handleAddListItem() {
    let task = {
        id: taskIdCounter,
        dateCreated: new Date(),
        taskTitle: newItemInputTitle.value,
        taskItself: newItemInput.value,
    };
    tasksArr.push(task);
    updateHTML(task);
    tasksTracker.textContent = `${tasksArr.length} Active tasks`
    newItemInput.value = "" 
    newItemInputTitle.value = "" 
    taskIdCounter++ 
    saveTasks();   
};
//Delete Task
function handleDeleteListItem(event){
    tasksArr = tasksArr.filter((task) => {
        return task.id !== parseInt(event.target.closest("div").parentElement.id);
    });
    listItemsContainer.innerHTML = "";
    tasksArr.forEach((task)=>{
        updateHTML(task)  
    });
    saveTasks()
    tasksTracker.textContent = `${tasksArr.length} Active tasks`;
};
//Edit Task
function handleEditListItem(event){
    let thisTask = event.target.closest("div").parentElement.children[0].children[0].children[1]
    let theText = thisTask.textContent
    thisTask.innerHTML = 
                        `
                        <textarea id="taskEditor" class="task-editor">${theText}</textarea>
                        <button onclick="handleEditPrint()">Finish Edit</button>
                        `
    
    //below: to stop clicking edit button twice which deletes edit text value and replaces it with the text of button "finish edit"
    let editButtons = document.querySelectorAll(".editButton")
    editButtons.forEach(button=>{
        button.onclick = null;
    })
};
function handleEditPrint(event){
    event = event || window.event;
    let thisTask = event.target.closest("div").parentElement.children[0].children[0].children[1]
    let editedText = document.querySelector("#taskEditor");

    let idToFind = event.target.closest("div").parentElement.id
    let taskInArrayIndex = tasksArr.findIndex(task => task.id === parseInt(idToFind))
    tasksArr[taskInArrayIndex].taskItself = editedText.value
    console.log(tasksArr[taskInArrayIndex])

    thisTask.innerHTML = `<span>${editedText.value}</span>`;

    //below: to stop clicking edit button twice which deletes edit text value and replaces it with the text of button "finish edit"
    let editButtons = document.querySelectorAll(".editButton")
    editButtons.forEach(button=>{
        button.onclick = handleEditListItem
    });
    
    // cannot edit two seperate notes at same time.
    // unles you begin edit, then create a new note and click edit on the new note.
    // if you do this now you can edit both. 
    // but if you click on finish edit for one of them, 
    // and then click on edit note again on the one still being edited it fills in finish edit for some reason
    // clicking delete on another task reloads dom and wipes any edits if you havent finished them
    
};

///Filter Functions///
function handleToggleFiltersMenu(){
    dropDown = document.querySelector("#FiltersContainer")
    dropDown.classList.toggle('invisible')
};
//sortBy
function handleSortAlphabeticalyAZ(){
    let toSortArr = [...tasksArr];
    listItemsContainer.innerHTML = ""
    toSortArr.sort((a,b)=>{
        let titleA = a.taskTitle.toLowerCase();
        let titleB = b.taskTitle.toLowerCase();
        
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });
    toSortArr.forEach((task)=>{
        updateHTML(task) 
    });
};

function handleSortAlphabeticalyZA(){
    let toSortArr = [...tasksArr];
    listItemsContainer.innerHTML = "";
    toSortArr.sort((a,b)=>{
        let titleA = a.taskTitle.toLowerCase();
        let titleB = b.taskTitle.toLowerCase();
        
        if (titleA > titleB) {
            return -1;
        }
        if (titleA < titleB) {
            return 1;
        }
        return 0;
    });
    toSortArr.forEach((task)=>{
        updateHTML(task) 
    });
};

function handleSortByDateNewOld(){
    let tempArr = [...tasksArr];
    listItemsContainer.innerHTML = "";
    tempArr.sort((a,b)=> {
        return a.dateCreated - b.dateCreated;
    });
    tempArr.forEach((task)=>{
        updateHTML(task) 
    });
};

function handleSortByDateOldNew(){
    let tempArr = [...tasksArr];
    listItemsContainer.innerHTML = "";
    tempArr.sort((a,b)=>{
        return b.dateCreated - a.dateCreated;
    });
    tempArr.forEach((task)=>{
        updateHTML(task) 
    });
};

//searchBy

function handleSearchByTitle(){
    console.log("test");
    let taskSearchedForArr = tasksArr.filter(task => task.taskTitle.toLowerCase() === searchTitleInput.value.toLowerCase());
    listItemsContainer.innerHTML = "";
    taskSearchedForArr.forEach((task)=>{
        updateHTML(task) 
    });
};

function getCurrentDateFormatted(currentDate) {
    
    let year = currentDate.getFullYear();
    let month = ('0' + (currentDate.getMonth() + 1)).slice(-2); 
    let day = ('0' + currentDate.getDate()).slice(-2);

    let formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

function handleSearchByDate(){
    console.log("test");
    console.log(searchDateInput.value)
    let taskSearchedForArr = tasksArr.filter(task => getCurrentDateFormatted(task.dateCreated) === searchDateInput.value);
    listItemsContainer.innerHTML = "";
    taskSearchedForArr.forEach((task)=>{
        updateHTML(task) 
    });
};

//resetFilters

function handleResetFitlers(){
    
    listItemsContainer.innerHTML = "";
    tasksArr.forEach((task)=>{
        updateHTML(task) 
    });
};

