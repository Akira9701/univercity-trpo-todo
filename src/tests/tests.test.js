import {addTask, removeTask} from '../assets/scripts/app';


Object.defineProperty(window, "location", {
    value: new URL("http://example.com"),
    configurable: true,
  });

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
  };
global.localStorage = localStorageMock;




describe('test making elems', () => {
    
    const task = {
        key: new Date().valueOf(),
        title: 'test',
        completed: false,
    }
    const block = document.createElement('div');
    const listContainer = document.createElement('ul');
    listContainer.innerHTML = `<p class="todo_task-container_list-wrap-no-tasks">You have no tasks</p>`;
    const itemContainer = document.createElement('li')
    block.append(listContainer);
    const list = block.querySelector('ul');
    let taskItem = null;


    taskItem = localStorage.getItem(task.key);

    test('create item in ls and check element', () => {
        addTask(task, list);
        expect(localStorage.getItem(task.key) === null).toBe(false);
        expect(list.children.length).toBe(2);

    });
    test('remove item from ls and check element', () => {
        const item = list.querySelector('li');
        removeTask(item, task.key, list);
        expect(localStorage.getItem(task.key) === null).toBe(true);
        expect(list.children.length).toBe(1);
    });

})


