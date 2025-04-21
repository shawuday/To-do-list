let cbtn = document.getElementById("cbtn");
let cnt = document.querySelector(".container");
let add = document.querySelector(".add-list-conatainer");
let listName = document.querySelector("#NameOfTrack");
let naam = document.getElementById("list-name");
let addbtn = document.getElementById("addbtn");
let inputvalue = document.getElementById("addvalue");
let task = document.getElementById("addtask");

let tota = document.getElementById("total");
let done = document.getElementById("completed");
let pending = document.getElementById("pending");

cbtn.addEventListener("click", () => {
  if (listName.value.trim() !== "") {
    localStorage.setItem("listName", listName.value);
    switchBoard();
  }
  else alert("Please enter something!");
});
function switchBoard() {
  cnt.style.display = "none";
  add.style.display = "flex";
  naam.innerText = localStorage.getItem("listName");
}


let count = 0;
let completed = 0;


addbtn.addEventListener("click", () => {
  if (inputvalue.value.trim() !== "") {
    let checkboxes = document.createElement("input");
    checkboxes.type = "checkbox";
    checkboxes.className = "myCheckbox";
    let lab = document.createElement("lable");
    lab.innerText = " " + addvalue.value;
    let delBtn=document.createElement("button");
    delBtn.innerText="🗑";
    delBtn.className = "deleteBtn";

    let contains = document.createElement("div");
    contains.className = "div-container";
    contains.appendChild(checkboxes);
    contains.appendChild(lab);
    contains.appendChild(delBtn);
    task.appendChild(contains);
    inputvalue.value = "";
    count += 1;
    updateLocalStorage();
  } else {
    alert("Please enter something!");
  }
  tota.innerText = count + " total";
});

task.addEventListener("click", (event)=>{
  if(event.target && event.target.classList.contains("deleteBtn")){
    const containerDiv = event.target.parentElement;
    const checkbox = containerDiv.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      completed--;
    }
    count--;

    containerDiv.remove(); // 🗑 Remove the div

    tota.innerText = count + " total";
    done.innerText = completed + " done";
    pending.innerText = (count - completed) + " pending";

    updateLocalStorage(); // update local storage after deletion
  }
});


task.addEventListener("change", (event) => {
  if (event.target && event.target.matches("input.myCheckbox")) {
    if (event.target.checked) {
      completed++;
    } else {
      completed--;
    }
    done.innerText = completed + " done";
    pending.innerText = (count - completed) + " pending";
    updateLocalStorage();
    console.log("changing sec is working");
  }
});

function updateLocalStorage() {
  const allCheckboxes = document.querySelectorAll(".myCheckbox");
  const data = [];

  allCheckboxes.forEach((cb, index) => {
    let label = cb.nextSibling.textContent.trim(); // Checkbox ke label ka text
    data.push({
      name: label,
      checked: cb.checked
    });
  });

  localStorage.setItem("taskData", JSON.stringify(data));
  localStorage.setItem("count", count);
  localStorage.setItem("completed", completed);
}


window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("taskData")) || [];
  if (!savedTasks.length) return;
  switchBoard();

  count = parseInt(localStorage.getItem("count")) || 0;
  completed = parseInt(localStorage.getItem("completed")) || 0;

  savedTasks.forEach(item => {
    let checkboxes = document.createElement("input");
    checkboxes.type = "checkbox";
    checkboxes.className = "myCheckbox";
    checkboxes.checked = item.checked;

    let delBtn=document.createElement("button");
    delBtn.className="deleteBtn";
    delBtn.innerText="🗑";

    let lab = document.createElement("label");
    lab.innerText = " " + item.name;

    let contains = document.createElement("div");
    contains.appendChild(checkboxes);
    contains.appendChild(lab);
    contains.appendChild(delBtn);
    task.appendChild(contains);
  });

  tota.innerText = count + " total";
  done.innerText = completed + " done";
  pending.innerText = (count - completed) + " pending";
});
