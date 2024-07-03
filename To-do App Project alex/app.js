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
let taskIdCounter = 1 

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

function handleAddListItem() {
    let task = {
        id: taskIdCounter,
        dateCreated: new Date(),
        taskTitle: newItemInputTitle.value,
        taskItself: newItemInput.value,
    };
    tasksArr.push(task);
    updateHTML(task)
    tasksTracker.textContent = `${tasksArr.length} Active tasks`
    newItemInput.value = "" 
    newItemInputTitle.value = "" 
    taskIdCounter++ 
    
};
//Delete
function handleDeleteListItem(event){
    let filteredArr = tasksArr.filter((task) => {
        return task.id !== parseInt(event.target.closest("div").parentElement.id);
    });
    tasksArr = filteredArr;
    listItemsContainer.innerHTML = "";
    tasksArr.forEach((task)=>{
        updateHTML(task)  
    });
    
    tasksTracker.textContent = `${tasksArr.length} Active tasks`;
    taskIdCounter--;
};
//Edit
function handleEditListItem(event){
    let thisTask = event.target.closest("div").parentElement.children[0].children[0].children[1]
    let theText = thisTask.textContent
    thisTask.innerHTML = `<input id="taskEditor" class="task-editor" value="${theText}"><button onclick="handleEditPrint()">Finish Edit</button>`
    
    let editButtons = document.querySelectorAll(".editButton")
    editButtons.forEach(button=>{
        button.onclick = null
    })
};

function handleEditPrint(event){
    event = event || window.event;
    let thisTask = event.target.closest("div").parentElement.children[0].children[0].children[1]
    let editedText = document.querySelector("#taskEditor");
    thisTask.innerHTML = `<span>${editedText.value}</span>`;
    
    let editButtons = document.querySelectorAll(".editButton")
    editButtons.forEach(button=>{
        button.onclick = handleEditListItem
    });

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
    let taskSearchedFor = tasksArr.find(task => task.taskTitle.toLowerCase() === searchTitleInput.value.toLowerCase());
    listItemsContainer.innerHTML = "";
    updateHTML(taskSearchedFor);
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

//reset

function handleResetFitlers(){
    
    listItemsContainer.innerHTML = "";
    tasksArr.forEach((task)=>{
        updateHTML(task) 
    });
};

