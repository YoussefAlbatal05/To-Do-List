
let addBtn = document.querySelector(".button")
let taskInput = document.querySelector(".input")
let listContainer = document.querySelector(".list-container")

function addingTask () {
     if ( taskInput.value === '' ){
        alert("You Must Write Smth!")
     } else {
        let taskList = document.createElement("li") // here we will create li element in html cuz the tasks will be written in the form of li
        taskList.innerHTML = taskInput.value // we will write what the user will type in the li we created in html
        listContainer.appendChild(taskList) // so now we need to display the li we created somewhere in the html so we will display it in listContainer which is ul and the li is gonna be its child  

        let span = document.createElement("span") // here we will make a delete task button in the form of a span 
        span.classList.add("fa-solid", "fa-xmark") // we will add the delete task button as a classList in the taskList (li) , so every task will have span inside it 
        taskList.appendChild(span) // we will display the delete button next to every task we will write so we will do it this way by appendChild

        let span2 = document.createElement("span")
        span2.classList.add("fa-solid" , "fa-pen-to-square" , "span2") // you will need to call this span in the css so you need to add a className
        taskList.appendChild(span2)

    } 
     taskInput.value = ""; // this will clear the input after you add the task you wrote
     saveDataAfterRefreshing() // after every update you will make the data in the listContainer will be saved in the localStorage("data") , now we need to get this data by localStorage.getItem() to display it
}



listContainer.addEventListener("click" , (e) => {  // e refers to the element you will click on , the line means when you press on any element of the listContainer

    if(e.target.tagName === "LI"){   // e.target represents the actual HTML element that was clicked , e.target.tagName gives you the name of the HTML tag of the clicked element in uppercase , so if you clicked on li (task) this what will happen next
            e.target.classList.toggle("checked");   // classList.toggle("checked") adds or removes the class "checked" on the clicked task ( we styled the checked in the css ) , classList is when we want to manage or target a class inside element , classList.toggle() alternates (toggles) the class. It’s a shortcut for "add if missing, remove if present." this is toggle usage
            saveDataAfterRefreshing() 
    }
    else if(e.target.classList.contains("fa-xmark")){
           e.target.parentElement.remove();   // here we will target the parentElement of the span which is li (the task we want to delete) and remove it
           saveDataAfterRefreshing() 
    }
    else if(e.target.classList.contains("span2")) { // here we will use e.target.classList.containes cuz this is a className not a tag
         let task = e.target.parentElement; // here the parent element is the task (li)
         let taskText = task.childNodes[0].textContent; // textContent means the content which is text not element (not span) just the text in the li
         let newTask = prompt("Edit Your Task:" , taskText); // displays a prompt to the user with the current task text (taskText)
         if (newTask) {
              task.childNodes[0].textContent = newTask; // here we will update the task (li) we have by getting the firstChild of the li which is the task text (not the span) and write .textContent to update the text with newTask 
              alert("Task Updated!")
              saveDataAfterRefreshing()
         }
    }

} )




 const saveDataAfterRefreshing = () => {
       localStorage.setItem("data" , listContainer.innerHTML) // we created a key named data in the localStorage and we saved the data written in listContainer in the html in it
}


 const showDataFromLocalStorage = () => {
       listContainer.innerHTML = localStorage.getItem("data") // now we got the data from the localStorage and we will display it in listContainer
 }
 showDataFromLocalStorage();






addBtn.addEventListener( "click" , (e) => {
    e.preventDefault();
    addingTask();

})



