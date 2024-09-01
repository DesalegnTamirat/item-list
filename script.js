const addButton = document.querySelector(".btn");
const itemList = document.querySelector("ul");
const item = document.getElementById("item-input");
const clearButton = document.getElementById("clear");

function insertItem(e) {
  e.preventDefault(); // prevent submission
  if(item.value === "") return // simple validation


  // creating list item
  const li = document.createElement("li");



  li.appendChild(document.createTextNode(item.value));
  item.value = ""; // empty the input field

  //append the remove button and finally to ul
  li.appendChild(createButton());
  itemList.appendChild(li);
}

function createButton() {
  // create button and setting the class
  const button = document.createElement("button");
  button.className = "remove-item btn-link text-red";

  // appending the x icon
  button.appendChild(createIcon());

  return button;
}

function createIcon() {
  // create icon and setting the class
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";

  return icon;
}


function removeItem(e) {
  if (e.target.tagName === "I") {
    e.target.parentElement.parentElement.remove()
  }
}

function removeAll(e) {
  while(itemList.firstChild)
    itemList.firstChild.remove()
}


// adding eventlisteners
addButton.addEventListener("click", insertItem);
itemList.addEventListener("click",removeItem);
clearButton.addEventListener("click", removeAll);
