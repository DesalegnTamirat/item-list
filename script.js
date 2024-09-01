// Selecting DOM elements used throughout the script
const addButton = document.querySelector(".btn");          // Button to add new items
const itemList = document.querySelector("ul");             // List where items will be displayed
const item = document.getElementById("item-input");        // Input field for entering new items
const clearButton = document.getElementById("clear");      // Button to clear all items

// Function to handle adding a new item to the list
function insertItem(e) {
  e.preventDefault(); // Prevent form submission (default behavior)
  
  if (item.value === "") return; // Simple validation: do nothing if input is empty

  const li = document.createElement("li"); // Create a new list item

  li.appendChild(document.createTextNode(item.value)); // Add input text to the list item
  item.value = ""; // Clear the input field after adding the item

  const button = createButton("remove-item btn-link text-red"); // Create a remove button
  button.appendChild(createIcon("fa-solid fa-xmark")); // Add an icon to the button
  
  li.appendChild(button); // Append the remove button to the list item
  itemList.appendChild(li); // Add the list item to the item list (ul)
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
    e.target.parentElement.parentElement.remove(); // Remove the entire list item
  }
}

// Function to handle clearing all items from the list
function removeAll(e) {
  while (itemList.firstChild) { // Loop through all child elements of the list
    itemList.firstChild.remove(); // Remove each child element
  }
}

// Event listeners to trigger the appropriate functions
addButton.addEventListener("click", insertItem); // Add item on button click
itemList.addEventListener("click", removeItem); // Remove item on clicking the remove button
clearButton.addEventListener("click", removeAll); // Clear all items on clicking the clear button
