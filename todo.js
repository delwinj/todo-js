let todoItems = [];

function renderTodo(todo) {
    const list = document.querySelector('.todo-list');
    list.insertAdjacentHTML('beforeend', `
        <li class="todo-item" data-key="${todo.id}">
            <input id="${todo.id}" type="checkbox" class="styled">
            <label for="${todo.id}" class="tick"></label>
            <span>${todo.text}</span>
            <button class="delete-todo">
                <svg><use href="#delete-icon"></use></svg>
            </button>
            
        </li>
    `);
}

function addTodo(text) {
    const todo = {
        text,
        checked: false,
        id: Date.now()
    };

    todoItems.push(todo);
    renderTodo(todo);
}

function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    todoItems[index].checked = !todoItems[index].checked;

    const item = document.querySelector(`[data-key='${key}']`);
    if (todoItems[index].checked) {
        item.classList.add('done');
    } else {
        item.classList.remove('done');
    }
}

const form = document.querySelector('.todo-form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = document.querySelector('.todo-form-input');

    const text = input.value.trim();
    if (text !== "") {
        addTodo(text);
        input.value = "";
        input.focus();
    }
});

const list = document.querySelector('.todo-list');
list.addEventListener('click', event => {
    if(event.target.classList.contains('tick')) {
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
});