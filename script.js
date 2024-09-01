// Selecting DOM elements used throughout the script
const addButton = document.querySelector(".btn");          // Button to add new items
const itemList = document.querySelector("ul");             // List where items will be displayed
const itemInput = document.getElementById("item-input");   // Input field for entering new items
const filter = document.getElementById("filter");          // Filter input field
const clearButton = document.getElementById("clear");      // Button to clear all items
let isOnEdit = false;

// Function to handle adding or updating an item
function insertItem(e) {
  e.preventDefault();

  const itemName = itemInput.value.trim(); // Get the value of the input field and trim whitespace
  if (itemName === "") return; // Simple validation: do nothing if input is empty

  if (isOnEdit) {
    updateItem(itemName);
  } else {
    if (checkExistence(itemName)) {
      alert("The item already added");
      return;
    }
    addToDom(itemName); // Add the item to the DOM
    addItemToLocalStorage(itemName); // Add the item to localStorage
  }

  resetForm();
}

// Function to add a new item to the DOM
function addToDom(itemName) {
  const li = document.createElement("li"); // Create a new list item
  li.appendChild(document.createTextNode(itemName)); // Add input text to the list item

  const button = createButton("remove-item btn-link text-red"); // Create a remove button
  button.appendChild(createIcon("fa-solid fa-xmark")); // Add an icon to the button
  
  li.appendChild(button); // Append the remove button to the list item
  itemList.appendChild(li); // Add the list item to the item list (ul)

  checkUI(); // Update UI based on the current list state
}

// Function to update an existing item
function updateItem(newItemName) {
  const currentItem = document.querySelector(".edit-mode").firstChild.textContent;

  if (checkExistence(newItemName) && currentItem !== newItemName) {
    alert("The name overlaps with another item");
    return;
  }

  const shoppingList = JSON.parse(localStorage.getItem("shopping list")) || [];
  const itemIndex = shoppingList.indexOf(currentItem);
  if (itemIndex !== -1) {
    shoppingList[itemIndex] = newItemName;
    localStorage.setItem("shopping list", JSON.stringify(shoppingList));
  }

  display(); // Refresh the display to show updated item
}

// Function to reset the form after adding or editing an item
function resetForm() {
  itemInput.value = ""; // Clear the input field
  addButton.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item"; // Reset button text
  addButton.style.backgroundColor = "#333"; // Reset button color
  isOnEdit = false;

  const toBeEdited = document.querySelector(".edit-mode");
  if (toBeEdited) toBeEdited.classList.remove("edit-mode"); // Remove edit mode from the item

  checkUI(); // Update UI
}

// Function to create a button element with specified classes
function createButton(classes, id = "") {
  const button = document.createElement("button"); // Create a button element
  button.className = classes; // Set the class names
  if (id !== "") button.id = id; // Optionally set an ID if provided

  return button; // Return the created button element
}

// Function to create an icon element with specified classes
function createIcon(classes) {
  const icon = document.createElement("i"); // Create an icon element
  icon.className = classes; // Set the class names

  return icon; // Return the created icon element
}

// Function to handle removing an item from the list
function removeItem(e) {
  if (e.target.tagName === "I") { // Check if the clicked element is an icon
    const itemToRemove = e.target.parentElement.parentElement;
    const itemName = itemToRemove.firstChild.textContent;
    
    if (confirm("Are you sure?")) {
      itemToRemove.remove(); // Remove the entire list item
      removeItemFromLocalStorage(itemName); // Remove from localStorage
      checkUI();
    }
  } else {
    addToEdit(e); // If not removing, add the item to edit mode
  }
}

// Function to handle clearing all items from the list
function removeAll() {
  if (!confirm("Do you want to remove all items?")) return;
  
  itemList.textContent = ""; // Clear all list items from the DOM
  
  clearLocalStorage(); // Clear all items from localStorage
  checkUI(); // Update UI
}

// Function to add an item to edit mode
function addToEdit(e) {
  checkUI();
  if (!(e.target === e.currentTarget)) {
    isOnEdit = true;
    e.target.classList.add("edit-mode");
    itemInput.value = e.target.firstChild.textContent;
    addButton.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
    addButton.style.backgroundColor = "rgb(10, 100, 10)";
  }
}

// Function to check if an item already exists
function checkExistence(itemName) {
  const shoppingList = JSON.parse(localStorage.getItem("shopping list")) || [];
  return shoppingList.includes(itemName);
}

// Function to check UI elements based on list state
function checkUI() {
  const lists = document.querySelectorAll("li");
  
  clearButton.style.display = lists.length === 0 ? "none" : "block";
  filter.style.display = lists.length === 0 ? "none" : "block";

  if (isOnEdit) resetForm(); // Reset the form if in edit mode
}

// Function to filter the list items based on user input
function filterOut() {
  const target = filter.value.toLowerCase();
  const lists = document.querySelectorAll("li");

  lists.forEach(list => {
    const itemName = list.textContent.toLowerCase();
    list.style.display = itemName.includes(target) ? "flex" : "none";
  });
}

// Function to add an item to localStorage
function addItemToLocalStorage(itemName) {
  const shoppingList = JSON.parse(localStorage.getItem("shopping list")) || [];
  shoppingList.push(itemName);
  localStorage.setItem("shopping list", JSON.stringify(shoppingList));
}

// Function to display items from localStorage on page load
function display() {
  itemList.innerHTML = ""; // Clear the current list
  const shoppingList = JSON.parse(localStorage.getItem("shopping list")) || [];
  shoppingList.forEach(itemName => addToDom(itemName));
}

// Function to remove an item from localStorage
function removeItemFromLocalStorage(itemName) {
  let shoppingList = JSON.parse(localStorage.getItem("shopping list")) || [];
  shoppingList = shoppingList.filter(item => item !== itemName);
  localStorage.setItem("shopping list", JSON.stringify(shoppingList));
}

// Function to clear all items from localStorage
function clearLocalStorage() {
  localStorage.removeItem("shopping list");
}

// Event listeners to trigger the appropriate functions
addButton.addEventListener("click", insertItem); // Add item on button click
itemList.addEventListener("click", removeItem); // Remove item on clicking the remove button
clearButton.addEventListener("click", removeAll); // Clear all items on clicking the clear button
filter.addEventListener("input", filterOut); // Filter items based on input

// Optional: Handle Enter key to add/update item
itemInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") insertItem(e);
});

// Display items from localStorage on page load
display();
checkUI();
