import * as url from '../images/close.png';



function Tasks(){
    let activeTodo = [];
    let completedTodo = [];
    const btnAdd = document.querySelector('.todo_task-container_add-wrap-btn');
    const inputText = document.querySelector('.todo_task-container_add-wrap-input');
    const taskList = document.querySelector('.todo_task-container_list-wrap ul');
    const completedTaskList = document.querySelector('.todo_task-container_completed-list-wrap ul');
    const [noTaskMes , noTaskCompeletedMes] = document.querySelectorAll('.todo_task-container_list-wrap-no-tasks');
    
    // const noTaskMess = document.querySelector('.todo_task-container_list-wrap-no-tasks')[0];



    function removeTask(item, id, side){
        item.remove();
        localStorage.removeItem(id);
        console.log(!side.querySelectorAll('li').length)
        console.log(side.querySelector('.todo_task-container_list-wrap-no-tasks'))
        !side.querySelectorAll('li').length && side.querySelector('.todo_task-container_list-wrap-no-tasks').classList.remove('todo_task-container_list-wrap-no-tasks-off') 

    }

    function addTask(task, side, wrapper){
        !side.querySelectorAll('li').length && side.querySelector('.todo_task-container_list-wrap-no-tasks').classList.add('todo_task-container_list-wrap-no-tasks-off') 
        wrapper.push(task);
        side.append(taskItemComponent(task, side));
        localStorage.setItem(task.key, JSON.stringify(task));
    }


    const taskItemComponent = (task, side) => {
        
        const taskItem = document.createElement('li');
        taskItem.classList.add('todo_task-container_list-wrap-element');
        taskItem.classList.add(!side.parentElement.classList.contains('todo_task-container_list-wrap') 
        ? 'todo_task-container_completed-list-wrap-element' : 'o');
        taskItem.dataset.id = task.key;

        const taskTitle = document.createElement('p');
        taskTitle.textContent = task.title;
        const taskImgContainer = document.createElement('div');
        taskImgContainer.classList.add('todo_task-container_list-wrap-element-close-btn');
        const taskImg = document.createElement('img');
        taskImg.src = url.default;
        if(side.parentElement.classList.contains('todo_task-container_list-wrap')){
            const taskItemCheckbox = document.createElement('div');
            taskItemCheckbox.classList.add('todo_task-container_list-wrap-element-checkbox');
            const taskCheckbox = document.createElement('input');
            const checkboxImg = `<svg xmlns="http://www.w3.org/2000/svg"  class="bi bi-check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>`;
            // checkboxImg.src = './assets/images/check.svg';
            taskCheckbox.addEventListener('click', (e) => {
                if(!taskItemCheckbox.classList.contains('todo_task-container_list-wrap-element-checkbox-active')){
                    taskItemCheckbox.classList.add('todo_task-container_list-wrap-element-checkbox-active');
                    taskItemCheckbox.parentElement.classList.add('todo_task-container_list-wrap-element-completed');
                    activeTodo =  [...activeTodo.filter(el => el.ley === task.key)]
                    setTimeout(() => {
                        taskItem.remove();
                        !side.querySelectorAll('li').length && side.querySelector('.todo_task-container_list-wrap-no-tasks').classList.remove('todo_task-container_list-wrap-no-tasks-off') 

                        addTask({...task, completed: true}, completedTaskList, completedTodo)
                    }, 1000);             
                }
            })
            taskCheckbox.setAttribute("type", "checkbox");
            taskItemCheckbox.append(taskCheckbox);
            taskItemCheckbox.insertAdjacentHTML('beforeend',checkboxImg);
            taskItem.append(taskItemCheckbox);


        }


        taskImgContainer.append(taskImg);
        taskItem.append(taskTitle);
        taskItem.append(taskImgContainer);
        taskImgContainer.addEventListener('click', (e) => {
            removeTask(taskItem, task.key, side);
        })
        return taskItem;
    }

    btnAdd.addEventListener('click', () => {
        if(inputText.value !== ""){
            const task = {
                key: new Date().valueOf(),
                title: inputText.value,
                completed: false,
            }
            addTask(task, taskList, activeTodo);


        }
        
    })
    function setTasks(){
        
        Object.values(localStorage).map(el => JSON.parse(el)).filter(el => el.completed === false ).map(el => addTask(el, taskList, activeTodo));
        Object.values(localStorage).map(el => JSON.parse(el)).filter(el => el.completed === true ).map(el => addTask(el, completedTaskList, completedTodo));
    

    }
    setTasks();



}



Tasks();