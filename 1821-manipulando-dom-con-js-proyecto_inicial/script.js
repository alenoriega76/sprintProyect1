
import checkComplete from "./assets/componets/checkComplete";
import deleteIcon from "./assets/componets/deleteIcon";
const btn= document.querySelector('[data-form-btn]');

const createTask=(event)=>{
    event.preventDefault();
    const input = document.querySelector('[data-form-input]');
    const calendar= document.querySelector('[data-form-date]');
    const value= input.value;
    const list = document.querySelector('[data-list]')
    const task = document.createElement('li');
    task.classList.add('card')
    input.value= '';
    const taskContent= document.createElement('div');
    taskContent.appendChild(checkComplete());
    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task');
   
    taskTitle.innerText= value;
    taskContent.appendChild(taskTitle);
    
    //const content= `
        // <i class="fas fa-trash-alt trashIcon icon"></i>`;
  //task.innerHTML=content;
  task.appendChild(taskContent);
  task.appendChild(deleteIcon());
  list.appendChild(task);
};

btn.addEventListener('click',createTask); 


 
