window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');

    const newTodoForm = document.querySelector('#new-todo-form');

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        if(todo.content === "" || todo.category === "")
        {
            alert("Please Create a Valid Todo.")
        }
        else{
            todos.push(todo);

            localStorage.setItem('todos', JSON.stringify(todos));

            e.target.reset();
            console.log("Added");

            DisplayTodos();
        }
    })

    const category_filter1 = document.querySelector('#category1');

    category_filter1.addEventListener('change', e => {
        DisplayTodos1('business');
        console.log("Listening");
    })

    const category_filter2 = document.querySelector('#category2');

    category_filter2.addEventListener('change', e => {
        DisplayTodos1('personal');
        console.log("Listening");
    })
    

    DisplayTodos();
})


function DisplayTodos1(categ) {
    console.log("Hello"); 

    if(document.querySelector('#content').value === ''){
        const todoList = document.querySelector('#todo-list');

        todoList.innerHTML = "";

        todos.forEach(todo => {

            if(todo.category == categ)
            {
                const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item')

            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit_btn = document.createElement('button');
            const delete_btn = document.createElement('button');

            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble');

            if(todo.category == 'personal'){
                span.classList.add('personal');
            }
            else{
                span.classList.add('business');
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit_btn.classList.add('edit');
            delete_btn.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit_btn.innerHTML = 'Edit';
            delete_btn.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);

            actions.appendChild(edit_btn);
            actions.appendChild(delete_btn);

            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if(todo.done){
                todoItem.classList.add('done');
            }

            input.addEventListener('click', e => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                if(todo.done){
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                }

                DisplayTodos();
            })

            edit_btn.addEventListener('click', e => {
                const input = content.querySelector('input');
                input.removeAttribute('readonly');

                const end = input.value.length;
                input.setSelectionRange(end, end);
                input.focus();

                input.addEventListener('blur', e => {
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos();
                })
            })

            delete_btn.addEventListener('click', e => {
                
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
            }

        });
    }
}

function DisplayTodos() {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = "";

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit_btn = document.createElement('button');
        const delete_btn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if(todo.category == 'personal'){
            span.classList.add('personal');
        }
        else{
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit_btn.classList.add('edit');
        delete_btn.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit_btn.innerHTML = 'Edit';
        delete_btn.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);

        actions.appendChild(edit_btn);
        actions.appendChild(delete_btn);

        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done){
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })

        edit_btn.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');

            const end = input.value.length;
            input.setSelectionRange(end, end);
            input.focus();

            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        delete_btn.addEventListener('click', e => {
            
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    });
}