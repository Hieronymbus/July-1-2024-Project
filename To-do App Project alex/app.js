const dateTracker = document.querySelector("#dateTracker");
const tasksTracker = document.querySelector("#tasksTracker");
const listItemsContainer = document.querySelector("#listGroup");
const newItemInput = document.querySelector("#newItemInput");
const addItemButton = document.querySelector("#addNewItemButton");
const deleteItemButton = document.querySelector("#deleteListItemButton");
const editItemButton = document.querySelector("deleteListItemButton");

addItemButton.addEventListener("click",handleAddListItem);
deleteItemButton.addEventListener("click",handleDeleteListItem);
editItemButton.addEventListener("click",handleEditListItem);

function handleAddListItem() {
    listItemsContainer.innerHTML += 
    `
        <div class="list-group-item">
            <div class="lead">
               <p>${newItemInput.value}</p> 
            </div>
            <div class="float-end">
                <button id="deleteListItemButton">
                    <img src="assets/trash-bin.png" alt="Bin icon">
                </button>
                <button id="editListItemButton">
                    <img src="assets/edit.png" alt="Edit icon">
                </button>
            </div>
        </div>
    `;   
};

function handleDeleteListItem(){

};

function handleEditListItem(){

};