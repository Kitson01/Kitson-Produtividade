document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const themeToggle = document.getElementById('theme-toggle');
    const menuTitle = document.getElementById('menu-title');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Adiciona uma tarefa ao clicar no botão
    addTaskButton.addEventListener('click', addTask);

    // Adiciona uma tarefa ao pressionar Enter no campo de entrada
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Adiciona animação ao título do menu ao ser clicado
    menuTitle.addEventListener('click', () => {
        menuTitle.classList.add('clicked');
        setTimeout(() => {
            menuTitle.classList.remove('clicked');
        }, 300);
    });

    // Alterna o modo escuro ao mudar o toggle
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', themeToggle.checked);
    });

    // Adiciona a funcionalidade de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterTasks(button.dataset.filter);
        });
    });

    // Função para adicionar uma tarefa
    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return; // Não adiciona tarefa vazia

        const newTask = document.createElement('li');
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.addEventListener('click', () => {
            taskContent.classList.toggle('completed');
        });

        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');

        // Botão de edição
        const editButton = document.createElement('i');
        editButton.className = 'fas fa-edit';
        editButton.addEventListener('click', () => {
            const newText = prompt('Edite a tarefa:', taskContent.textContent);
            if (newText) taskContent.textContent = newText;
        });

        // Botão de exclusão
        const deleteButton = document.createElement('i');
        deleteButton.className = 'fas fa-trash-alt';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(newTask);
        });

        actionButtons.appendChild(editButton);
        actionButtons.appendChild(deleteButton);

        newTask.appendChild(taskContent);
        newTask.appendChild(actionButtons);
        taskList.appendChild(newTask);

        taskInput.value = ''; // Limpa o campo de entrada após adicionar a tarefa
    }

    // Função para filtrar as tarefas
    function filterTasks(filter) {
        const tasks = taskList.querySelectorAll('li');
        tasks.forEach(task => {
            if (filter === 'all') {
                task.style.display = 'flex';
            } else if (filter === 'completed' && task.querySelector('span').classList.contains('completed')) {
                task.style.display = 'flex';
            } else if (filter === 'pending' && !task.querySelector('span').classList.contains('completed')) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }
});