// ********* Hold items in an array (this is your single source of truth) ***************

let items = [];


// ********* Select necessary DOM elements (form, input, list, count) ***************

const addForm = document.querySelector("#add-form");
const name = document.querySelector("#name");
const list = document.querySelector("#list");
const count = document.querySelector("#count");

// ********* Write a render() function to rebuild the list from the array ***************

function render() {
  // 1. Clear the current list (innerHTML = "")
  list.innerHTML = "";

  // 2. Loop through the items array
  items.map(item => {
    // 3. Create elements, use data-id on each row, and append to the list
    const li = document.createElement("li");
    li.textContent = item.name;
    li.dataset.id = `item-${items.length}`;
    list.append(li);

    // 4. Update the live count paragraph
    count.textContent = `${items.length} items`;
  })
}

// ********* Handle form submission ***************

addForm.addEventListener("submit", (e) => {
  // 1. preventDefault to stop page reload
  e.preventDefault();
  
  // 2. Read and validate the input
  if (!name.value) {
    alert("Enter a valid item name");
    return;
  }

  // 3. Push a new object to the items array (include a unique id and done: false)
  const newItem = {
    id: items.length + 1,
    name: name.value,
    done: false,
  }
  items.push(newItem);
  name.value = "";

  // 4. Call render()
  render()
})

// ********* Set up event delegation on the #list ***************

// 1. Listen for clicks on the parent <ul>
list.addEventListener("click", (e) => {
  // 2. Use e.target and closest() to find the clicked row
  const li = e.target.closest("li");

  // 3. Determine if the user is toggling ".done" or removing a row
  if (!li) return;
  const id = li.dataset.id;
  li.remove();

  // 4. Update the items array accordingly
  items = items.filter(item => {
    !id.includes(item.id);
  })

  // 5. Call render()
  render();
})












