const libraryKey = "libraryKey";
const addBook = document.getElementById("addBook");
addBook.addEventListener("click", uploadBook);

let bookArray = [];
function storeBook() {
  return {
    id: randomId(),
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    year: document.getElementById("year").value,
    isComplete: false,
  };

}
function randomId() {
  return (id = "id" + Math.random().toString(16).slice(2));
}
function uploadBook() {
  let book = storeBook();
  if (localStorage.getItem(libraryKey) == null) {
   
    bookArray.unshift(book);
    localStorage.setItem(libraryKey, JSON.stringify(bookArray));
    renderData();
  } else if (localStorage.getItem(libraryKey) != null) {
   
    bookArray = getBook();
    bookArray.unshift(book);
    localStorage.setItem(libraryKey, JSON.stringify(bookArray));
    renderData();
  }
}
function renderData() {
  let list = document.getElementById("list");
  let listFinished = document.getElementById("listFinished");

  removeAllChildNodes(list);
  removeAllChildNodes(listFinished);
  let obj = getBook();
  for (let book of obj) {
    console.log(book.id);
    if (book.isComplete == false) {
      let newList = `<div
      class="flex justify-around items-center mt-3 p-4 rounded-2xl"
      style="background-color: #141e27; font-weight: 300"
    >
      <div class="flex flex-col">
        <p class="mb-2">${book.title}</p>
        <p class="mb-2">${book.author}</p>
        <p class="mb-2">${book.year}</p>
      </div>

      <div class="flex flex-col items-center w-1/4">
        <button id="${book.id}" class="mb-5 deleteButton">Delete</button>
        <button id="${book.id}" class="restoreButton" >Finish</button>
      </div>
    </div>`;
      list.innerHTML += newList;
    } else if (book.isComplete == true) {
      let newList = ` <div
      class="flex justify-around items-center w-full mt-3 p-4 rounded-2xl"
      style="background-color: #141e27; font-weight: 300"
    >
      <div class="flex flex-col">
      <p class="mb-2">${book.title}</p>
      <p class="mb-2">${book.author}</p>
      <p class="mb-2">${book.year}</p>
      </div>

      <div class="flex flex-col items-center w-1/4">
      <button id="${book.id}" class="mb-5 deleteButton">Delete</button>
      <button id="${book.id}" class="restoreButton" >Restore</button>
      </div>
    </div>`;
      listFinished.innerHTML += newList;
    }
  }
  addEventButton();
  addEventButtonRestore();
}

function addEventButton() {
  let button = document.querySelectorAll(".deleteButton");
  for (let oneButton of button) {
    oneButton.addEventListener("click", () => deleteBook(oneButton.id));
  }
}
function addEventButtonRestore() {
  let button = document.querySelectorAll(".restoreButton");
  for (let oneButton of button) {
    oneButton.addEventListener("click", () => changeStats(oneButton.id));
  }
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function deleteBook(id) {
  alert("Book deleted");
  let obj = getBook();
  let i = 0;
  for (let book of obj) {
    if (book.id == id) {
      obj.splice(i, 1);
      localStorage.setItem(libraryKey, JSON.stringify(obj));
      renderData();
    }
    i++;
  }
}
function changeStats(id) {
  alert("Book changed");
  let obj = getBook();
  let i = 0;
  for (let book of obj) {
    if (book.id == id) {
      if (book.isComplete == false) {
        obj[i].isComplete = true;
      } else if (book.isComplete == true) {
        obj[i].isComplete = false;
      }
      localStorage.setItem(libraryKey, JSON.stringify(obj));
      renderData();
    }
    i++;
  }
}
function getBook() {
  let source = localStorage.getItem(libraryKey);
  let obj = JSON.parse(source);
  return obj;
}
window.onload = renderData();
