// Selecting DOM elements used throughout the script
const addButton = document.querySelector(".btn");          // Button to add new items
const itemList = document.querySelector("ul");             // List where items will be displayed
const item = document.getElementById("item-input");        // Input field for entering new items
const filter = document.getElementById("filter");
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

  checkUI();
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
    if (confirm("Are you sure")) e.target.parentElement.parentElement.remove(); // Remove the entire list item
    checkUI();
  }
}

// Function to handle clearing all items from the list
function removeAll(e) {
  if (!confirm("Do you want to remove all item?")) return;
  while (itemList.firstChild) { // Loop through all child elements of the list
    itemList.firstChild.remove(); // Remove each child element
  }
  checkUI();
}

function filterOut() {

function checkUI() {
  const lists = document.querySelectorAll("li");

  // making the filter and the clearbutton disappear if no item and while there is make it visible
  if (lists.length === 0) {
    clearButton.style.display = "none";
    filter.style.display = "none";
  }
  else {
    clearButton.style.display = "block";
    filter.style.display = "block";
  }
}

  const target = filter.value.toLowerCase();
  const lists = document.querySelectorAll("li");
  lists.forEach(list => {
    itemName = list.textContent.toLowerCase();
    console.log(itemName);
    if(itemName.includes(target))
      list.style.display = "flex"
    else
      list.style.display = "none"
  })
}

// Event listeners to trigger the appropriate functions
addButton.addEventListener("click", insertItem); // Add item on button click
itemList.addEventListener("click", removeItem); // Remove item on clicking the remove button
clearButton.addEventListener("click", removeAll); // Clear all items on clicking the clear button
filter.addEventListener("input", filterOut)

checkUI();
