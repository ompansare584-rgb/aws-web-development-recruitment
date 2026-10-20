// Select DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsCount = document.getElementById('items-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize State from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Save to localStorage & Refresh View
function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}

// Add New Todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now().toString(),
        text: text,
        completed: false
    };

    todos.push(newTodo);
    todoInput.value = '';
    saveAndRender();
});

// Render Todos based on Filter
function renderTodos() {
    todoList.innerHTML = '';

    // Filter logic
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    if (filteredTodos.length === 0) {
        todoList.innerHTML = `<li style="text-align: center; color: var(--text-secondary); padding: 1.5rem;">No tasks found.</li>`;
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);

        li.innerHTML = `
            <div class="todo-left">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text" contenteditable="false">${escapeHTML(todo.text)}</span>
            </div>
            <div class="todo-actions">
                <button class="action-btn edit" title="Edit Task"><i class="fa-solid fa-pen"></i></button>
                <button class="action-btn delete" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        todoList.appendChild(li);
    });

    updateItemsLeft();
}

// Update Items Left Counter
function updateItemsLeft() {
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsCount.textContent = `${activeCount} item${activeCount === 1 ? '' : 's'} left`;
}

// Handle Click Events on Todo List (Delegation)
todoList.addEventListener('click', (e) => {
    const item = e.target.closest('.todo-item');
    if (!item) return;
    const id = item.getAttribute('data-id');

    // Toggle Complete
    if (e.target.classList.contains('todo-checkbox')) {
        todos = todos.map(todo => todo.id === id ? { ...todo, completed: e.target.checked } : todo);
        saveAndRender();
    }

    // Delete Task
    if (e.target.closest('.delete')) {
        todos = todos.filter(todo => todo.id !== id);
        saveAndRender();
    }

    // Edit Task
    if (e.target.closest('.edit')) {
        const textSpan = item.querySelector('.todo-text');
        const editBtn = item.querySelector('.edit');
        
        if (item.classList.contains('editing')) {
            // Save state
            item.classList.remove('editing');
            textSpan.setAttribute('contenteditable', 'false');
            editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
            editBtn.classList.remove('save');
            
            // Update in array
            const updatedText = textSpan.textContent.trim();
            if (updatedText) {
                todos = todos.map(todo => todo.id === id ? { ...todo, text: updatedText } : todo);
                saveAndRender();
            } else {
                renderTodos(); // revert if empty
            }
        } else {
            // Enter edit state
            item.classList.add('editing');
            textSpan.setAttribute('contenteditable', 'true');
            textSpan.focus();
            editBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
            editBtn.classList.add('save');
        }
    }
});

// Filter Buttons Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderTodos();
    });
});

// Security helper to prevent XSS injection in innerHTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'":&#39;, '"': '&quot;' }[tag] || tag)
    );
}

// Initial load render
renderTodos();