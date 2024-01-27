let input = document.querySelector("input");
let list = document.querySelector("#todo-list");
const arr = ["fa-check", "fa-pen", "fa-trash", "fa-bell"];

document.addEventListener("DOMContentLoaded", () => {
  if (input) {
    input.focus();
  }
});

input.addEventListener("keydown", (evt) => {
  if (evt.key == "Enter") {
    addTask();
  }
});

input.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
  }
});

function addTask() {
  if (input.value === "" || input.value.trim() === "") {
    alert("You must write something");
  }
  else {
    // Addition of new div
    let newDiv = document.createElement("div");
    newDiv.classList.add("list-div");

    // Addition of new list element
    let li = document.createElement("li");
    li.innerHTML = input.value;
    newDiv.append(li);

    let childDiv = document.createElement("div");
    childDiv.classList.add("list-child-div");

    // Addition of new icons for edit, delete and reminder
    for (let i = 0; i < arr.length; i++) {
      let icon = document.createElement("i");
      icon.classList.add("fa-solid", arr[i]);
      childDiv.append(icon);

      // Edit option
      if (arr[i] === "fa-pen") {
        icon.addEventListener("click", () => editTask(newDiv));
      }
      // Delete option
      else if (arr[i] === "fa-trash") {
        icon.addEventListener("click", () => delTask(newDiv));
      }
      // Reminder option
      else if (arr[i] === "fa-bell") {
        icon.addEventListener("click", () => setReminder(newDiv));
      } else {
        icon.addEventListener("click", () => checked(newDiv));
      }
    }

    newDiv.append(childDiv);
    list.append(newDiv);
  }
  let cont = document.querySelector("#todo-list")
  showParaTag(cont);
  input.value = "";
}

function editTask(parentDiv) {
  const edited = prompt("Enter the edited task");

  if (edited !== null && edited.trim() !== "") {
    parentDiv.querySelector("li").innerText = edited;
  } else {
    alert("You must write something");
  }
}

function delTask(parentDiv) {
  // parentDiv.dataset.deleted = 'true'; // to be checked
  parentDiv.remove();


  let cont = document.querySelectorAll("ul")
  for(let i=0; i<cont.length; i++){
    showParaTag(cont[i]);
  }
}

function setReminder(parentDiv) {
  // const isDeleted = parentDiv.dataset.deleted === 'true'; // to be checked

  // if(!isDeleted){
    const parentDivCopy = parentDiv.cloneNode(true);

    let timeVal = prompt(
      "Enter the Date and Time to set a reminder for the task  'formart : (YYYY-MM-DD HH:mm:ss)'"
    );
  
    if (timeVal === "" || timeVal.trim() === "") {
      alert(
        "You must enter the Date and Time to set a reminder for the task 'formart : (YYYY-MM-DD HH:mm:ss)'"
      );
    } else {
      const time = new Date(timeVal).getTime();
      const currTime = new Date().getTime();
  
      const timeDiff = time - currTime;
  
      const msg = parentDiv.querySelector("li").innerText;
  
      setTimeout(() => {
          alert(`Times up, Do your task "${msg}"`);
          list.append(parentDiv);
          parentDiv.style.display = 'flex';
          parentDivCopy.remove();
          let cont = document.querySelector("#rem-list")
          showParaTag(cont);
      }, timeDiff);
  
      const remList = document.querySelector("#rem-list");
      let iconToRemove = parentDivCopy.querySelector(".fa-bell");
      iconToRemove.remove();
      remList.append(parentDivCopy);
      parentDiv.style.display = 'none';
      
      // }
    }
    let cont = document.querySelector("#rem-list")
    showParaTag(cont);
}

function checked(parentDiv) {
  const arr1 = ["fa-check", "fa-pen", "fa-bell"];
  
  for(i=0; i<3; i++){
    let iconToRemove = parentDiv.querySelector("."+arr1[i]);
    if(iconToRemove){
      iconToRemove.remove();
    }
  }

  const compList = document.querySelector("#comp-list");
  compList.append(parentDiv);

  const cont = document.querySelector("#comp-list");
  showParaTag(cont);
}

function showParaTag(ul){
  let p = ul.querySelector("p");
  

  if(ul.children.length > 1){
    p.style.display = 'none';
  }
  else{
    p.style.display = 'block';
  }
}