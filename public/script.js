/******************************************
Treehouse Techdegree:
FSJS project 8 - SQL Library Manager
******************************************/

// Global Variables
const table = document.querySelector("table");
// const body = document.querySelector("body");
const content = document.querySelector(".content");
const columns = document.querySelector("tbody").children;
const button = document.querySelector("button");
const input = document.querySelector("input");

// Create and display dinamically (when invoked) the "No results found!" message.
const messageText = document.createElement("span");
messageText.innerHTML = "No results found!";
messageText.style.display = "none";
table.insertAdjacentElement("afterend", messageText);

const p = document.createElement("p");
p.style.display = "none";

const buttonReturn = document.createElement("a");
buttonReturn.className = "button";
buttonReturn.href="/books";
buttonReturn.textContent = "Return";

p.appendChild(buttonReturn);
messageText.insertAdjacentElement("afterend", p);

const noStudentsFound = display => {
  p.style.display = display;
  messageText.style.display = display;
};

/* 
Search bar functionality
This function gets two arguments as parameters, the list of students and the input value
typed in the search bar. 
If the input value is empty, The page will display all students as the initial page, because the function
understands that no filter request was passed in. So there is no need to filter the list. 
If the input value is found in one of the students' name, that student will be displayed.
Although, if the input value is not found in any student name, the message 'No results found!' will be displayed.
Every time this function is invoked, it removes all the previews displayed students and pagination,
and it recreates a new one calling the 'showPage' and 'appendPageLinks' functions 
with the new values passed to it as a 'filter'.
*/
const search = (input, columns) => {
  const page = document.querySelector(".pagination");
  const results = [];
  if (input.value === "") {
    content.removeChild(page);
    showPage(columns, 1);
    appendPageLinks(columns);
    noStudentsFound("none");
  } else {
    for (let i = 0; i < columns.length; i++) {
      columns[i].style.display = "none";
      for (let j = 0; j < columns[i].children.length; j++) {
        if (
          columns[i].children[j].textContent
            .toLowerCase()
            .includes(input.value.toLowerCase())
        ) {
          columns[i].style.display = "";
          results.push(columns[i]);
          break; 
        }
      }
    }
    if (results.length > 0) {
      console.log(table);
      noStudentsFound("none");
      content.removeChild(page);
      showPage(results, 1);
      appendPageLinks(results);
    } else {
      noStudentsFound("");
      content.removeChild(page);
      showPage(results, 1);
      appendPageLinks(results);
    }
  }
  console.log(results);
};

// Search bar Event Listener
button.addEventListener("click", event => {
  event.preventDefault();
  search(input, columns);
});

input.addEventListener('keyup', event => {
  event.preventDefault();
     search(input, columns);
});

const perPage = 10;
/* 
   This function takes a list of students as an array and the page number as arguments 
   to calculate the number of students displayed on the page. 
   It hides all the items in the list passed as argument except for 
   the ten students selected to be displayed in the page passed as an argument. 
*/
const showPage = (list, page) => {
  const startIndex = page * perPage - perPage;
  const endIndex = page * perPage;

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
};

/*
   This function generates a button for the pagination for every 10 students in the list passed as an argument.
   The buttons are created as needed. If the list of students is not a rounded number e.g. 54, The last 4
   students in the list will be placed in the last button. A button will never hold more than 10 students. 
   The function then creates the functionality for the buttons. Which when clicked, it will display
   the students assigned to that specific button. The first button is always 'active' as the first 10 students
   or equivalent (less than) are filtered by the search input and displayed first.
   Finally, the buttons are appended to the page and the pagination buttons are displayed at the bottom.
*/
const appendPageLinks = list => {
  const div = document.createElement("div");
  div.className = "pagination";
  content.insertAdjacentElement("beforeend", div);
  const ul = document.createElement("ul");
  div.appendChild(ul);

  const numPages = Math.ceil(list.length / perPage);
  for (let i = 0; i < numPages; i++) {
    const li = document.createElement("li");
    ul.appendChild(li);
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i + 1;
    li.appendChild(a);
    const page = document.querySelector('.pagination');
    const links = page.querySelectorAll("a");
    links[0].className = "active";
  }
  const page = document.querySelector('.pagination');
  const links = page.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", e => {
      for (let i = 0; i < links.length; i++) {
        links[i].className = "";
      }
      e.target.className = "active";

      showPage(list, e.target.textContent);
    });
  }
};

//Initializer
showPage(columns, 1);
appendPageLinks(columns);