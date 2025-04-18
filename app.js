let cbtn=document.getElementById("cbtn");
let cnt=document.querySelector(".container");
let add=document.querySelector(".add-list-conatainer");
let listName=document.querySelector("#NameOfTrack");
let naam=document.getElementById("list-name");
let addbtn=document.getElementById("addbtn");




cbtn.addEventListener("click",()=>{
  cnt.style.display = "none";
  add.style.display="flex";
  naam.innerText=listName.value;
});



