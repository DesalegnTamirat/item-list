// Selecting DOM elements used throughout the script
const addButton = document.querySelector(".btn");          // Button to add new items
const itemList = document.querySelector("ul");             // List where items will be displayed
const itemInput = document.getElementById("item-input");   // Input field for entering new items
const filter = document.getElementById("filter");          // Filter input field
const clearButton = document.getElementById("clear");      // Button to clear all items

// Function to handle adding a new item to the list
function insertItem(e) {
  e.preventDefault(); // Prevent form submission (default behavior)
  
  const itemName = itemInput.value.trim(); // Get the value of the input field and trim whitespace

  if (itemName === "") return; // Simple validation: do nothing if input is empty

  addToDom(itemName); // Add the item to the DOM
  addItemToLocalStorage(itemName); // Add the item to localStorage

  itemInput.value = ""; // Clear the input field after adding the item
}

function addToDom(itemName) {
  const li = document.createElement("li"); // Create a new list item

  li.appendChild(document.createTextNode(itemName)); // Add input text to the list item

  const button = createButton("remove-item btn-link text-red"); // Create a remove button
  button.appendChild(createIcon("fa-solid fa-xmark")); // Add an icon to the button
  
  li.appendChild(button); // Append the remove button to the list item
  itemList.appendChild(li); // Add the list item to the item list (ul)

  checkUI(); // Update UI based on the current list state
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
    }

    checkUI();
  }
}

// Function to handle clearing all items from the list
function removeAll(e) {
  if (!confirm("Do you want to remove all items?")) return;
  
  while (itemList.firstChild) { // Loop through all child elements of the list
    itemList.firstChild.remove(); // Remove each child element
  }
  
  clearLocalStorage();
  checkUI();
}

// Function to check UI elements based on list state
function checkUI() {
  const lists = document.querySelectorAll("li");
  
  // Toggle the filter and clear button visibility based on list presence
  if (lists.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  } else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
}

// Function to filter the list items based on user input
function filterOut() {
  const target = filter.value.toLowerCase();
  const lists = document.querySelectorAll("li");

  lists.forEach(list => {
    const itemName = list.textContent.toLowerCase();
    
    if (itemName.includes(target)) {
      list.style.display = "flex";
    } else {
      list.style.display = "none";
    }
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
  document.querySelector("ul").innerHTML = "";
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

checkUI(); // Initial UI check
display(); // Display items from localStorage on page load
