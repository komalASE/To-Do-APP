//Function for prevent from datalost after refreshing the page
window.onload = function () {
  displayTask();
};

//Add Task
const handleSubmit = () => {
  let addedTask = document.getElementById("addWork").value;

  if (addedTask.length == 0) {
    alert("Please Enter a Task First");
  } else {
    let uploadData = [];
    if (localStorage.getItem("entriesOfTask")) uploadData = JSON.parse(localStorage.getItem("entriesOfTask"));
    
    uploadData.push(addedTask);
    localStorage.setItem("entriesOfTask", JSON.stringify(uploadData));

    displayTask();

    document.getElementById("addWork").value = "";
  }
};

//Display Task
const displayTask = () => {
  let recordsDisplay = document.getElementById("recordsDisplay");

  let allEntriesOfTask = JSON.parse(localStorage.getItem("entriesOfTask"));

  let statement = " ";

  allEntriesOfTask.map((value, index) => {
    statement += `<div class="work">
    <div class="addedTask">
        <input type='text' style="border:none; width:33px" value = ${index + 1 + "."}></input>
        <input style="border:none; cursor:pointer" id="vaueEditAt${index}" type='text' value = ${value} oninput='document.getElementById("edit${index}").style.display = "initial"'></input>
    </div>
        
    <div class="deletButton">
        <i class="fa fa-trash"  aria-hidden="true" onclick="deleteTask(${index})"> &nbsp;</i>
    </div>
    <div class="editTask" id="edit${index}" style="display:none">
        <i class="fa-solid fa-pen" style="color:green; font-family: ui-monospace;
        font-weight: bold" id="btn" onclick="editTask(${index})">Save</i>
    </div>
    </div>`; 
  });
  recordsDisplay.innerHTML = statement;
};

//Edit Task
const editTask = (index) => {
  let data = JSON.parse(localStorage.getItem("entriesOfTask"));

const editableValue = document.getElementById(`vaueEditAt${index}`).value

  if (editableValue != "") {
    data[index] = editableValue;
    localStorage.setItem("entriesOfTask", JSON.stringify(data));
    displayTask();
  }
};

//Delete Task
const deleteTask = (index) => {
    console.log("here in delete  funnction", index);
    let data = JSON.parse(localStorage.getItem("entriesOfTask"));
  
    data.splice(index, 1);
  
    localStorage.setItem("entriesOfTask", JSON.stringify(data));
  
    displayTask();
  };
