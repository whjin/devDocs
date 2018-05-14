const STORAGE_KEY = 'todos-vuejs-2.0';
const todoStorage = {
    fetch: function () {
        const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(function (todo, index) {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
};

const filters = {
    all: function (todos) {
        return todos;

    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed;
        })
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed;
        })
    }
};

const vm = new Vue({
    data: {
        todos: todoStorage.fetch(),
        newTodo: '',
        editedTodo: null,
        visibility: 'all'
    },
    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos);
            }
        },
        deep: true
    },
    computed: {
        filteredTodos: function () {
            return filters[this.visibility](this.todos);
        },
        remaining: function () {
            return filters.active(this.todos).length;
        },
        allDone: {
            get: function () {
                return this.remaining === 0;
            },
            set: function (value) {
                this.todos.forEach(function (todo) {
                    todo.completed = value;
                })
            }
        }
    },
    filters: {
        pluralize: function (n) {
            return n === 1 ? 'item' : 'items';
        }
    },
    methods: {
        addTodo: function () {
            const value = this.newTodo && this.newTodo.trim();
            if (!value) {
                return;
            }
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            });
            this.newTodo = '';
        },
        removeTodo: function (todo) {
            this.todos.splice(this.todos.indexOf(todo), 1);
        },
        editTodo: function (todo) {
            this.beforeEditCache = todo.title;
            this.editTodo = todo;
        },
        doneEdit: function (todo) {
            if (!this.editTodo) {
                return;
            }
            this.editTodo = null;
            todo.title = todo.title.trim();
            if (!todo.title) {
                this.removeTodo(todo);
            }
        },
        cancelEdit: function (todo) {
            this.editTodo = null;
            todo.title = this.beforeEditCache;
        },
        removeCompleted: function () {
            this.todos = filters.active(this.todos)
        }
    },
    directives: {
        'todo-focus': function (el, binding) {
            if (binding.value) {
                el.focus()
            }
        }
    }
});

function onHashChange() {
    const visibility = window.location.hash.replace(/#\/?/, '');
    if (filters[visibility]) {
        vm.visibility = visibility;
    } else {
        window.location.hash = '';
        vm.visibility = 'all';
    }
}

window.addEventListener('hashchange', onHashChange);
onHashChange();

vm.$mount('#todoApp');