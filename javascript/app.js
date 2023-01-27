//=============================
// select items
//=============================

const form = document.querySelector(".shopping-form");
const alert = document.querySelector(".alert");
const shopping = document.getElementById("shopping");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".shopping-container");
const list = document.querySelector(".shopping-list");
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";


//=============================
// event listener
//=============================

// submit form
form.addEventListener("submit", addItem);
// clear list
clearBtn.addEventListener("click", clearItems);
// display items onload
window.addEventListener("DOMContentLoaded", setupItems);


//=============================
// functions
//=============================

// add item
function addItem(e) {
  e.preventDefault();
  const value = shopping.value;
  const id = new Date.getTime().toString();

  if (value !== "" && !editFlag) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("shopping-item") // css
    element.innerHTML = `
      <p class="title">${value}</p>
      <div class="btn-container">
        <!-- edit btn -->
        <button type="button" class="edit-btn">
          <i class="fas fa-edit"></i>
        </button>
        <!-- delete btn -->
        <button type="button" class="delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    // add event listener to both buttons
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn = element.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // set local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value !== "" && editFlag) {
    displayAlert("value changed", "success");

    // edit local storage
    editLocalStorage(editID, value);
    // set back to default
    setBackToDefault();
  } else {
    displayAlert("please enter value", "danger");
  }
}

