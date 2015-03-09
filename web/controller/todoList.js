App.controller('todoList', function (page, object) {
    this.restorable = false;

    var isNewList = false;
    var todoList = {};
    var originalTodo;

    var $tmpl = $(page).find('.todo-item').remove();
    var $todos = $(page).find('.todos');
    var $shareBtn = $(page).find('.app-button.right');
    var $backBtn = $(page).find('.app-button.left');
    
    if (typeof(object.observer) === "undefined") {
        isNewList = true;
    } else {
        todoObserver = object.observer;
        todoList = todoObserver();
        todoList.users = getUsernamesFromUserObjects(todoList.users);
    }

    setupView(todoList);

    function appendEmptyTodo() {
        var $todo = $tmpl.clone(true);
        var $desc = $todo.find('.app-input[type="input"]');
        $desc.val("");
        $todo.find('.app-input[type="checkbox"]').prop("checked", false);
        $todos.append($todo);

        var $empty;
        var hasEmpty = false;
        $desc.on('input', function (event) {
            if ($desc.val().length > 0 && !hasEmpty) {
                hasEmpty = true
                $empty = appendEmptyTodo();
            } else if ($desc.val().length < 1) {
                $empty.remove();
                hasEmpty = false;
            }
        });

        return $todo;
    };

    function saveTodoList(method, todoList) {
        var url = '/todo-lists';
        if (method === "PUT") {
            url += "/"+todoList.id;
        }

        API.auth(method, url, todoList, function (res, status) {
            if (status !== 200) {
                App.dialog({
                    title        : 'Saving Failed',
                    text         : 'Looks like there was an issue saving the todo list.',
                    okButton     : "Ok",
                    cancelButton : 'Discard',
                }, function (tryAgain) {
                    if (!tryAgain) {
                        App.back();
                    }
                });
            } else {
                if (method === "POST") {
                    App.lists.addList(observable(res));
                } else {
                    todoObserver(res);
                }
                App.back();
            }
        });
    };

    function setupView(todoList) {
        $appTitle = $(page).find('.app-title').text(todoList.name || "");
        
        if (todoList.items) {
            todoList.items.forEach(function (item) {
                var $todo = $tmpl.clone(true);
                $todo.find('.app-input[type="input"]').val(item.description);
                $todo.find('.app-input[type="checkbox"]').prop("checked", item.completed);
                $todos.append($todo);
            });
        }
        
        appendEmptyTodo();

        $shareBtn.on('click', function (event) {
            kik.pickUsers({ minResults: 0, preselected: todoList.users} , function (users) {
                if ( !users ) {
                    // action was cancelled by user
                } else {
                    todoList.users = []
                    users.forEach(function (user) {
                        todoList.users.push(user.username);
                    });
                }
            });
        });

        $backBtn.on('click', function (event) {
            todoList.items = [];
            todoList.name = $appTitle.text();

            children = $todos.children();
            children.each(function (index, child) {
                if (index === children.length-1) return false;

                var todo = {};
                todo.description = $(child).find('.app-input[type="input"]').val();
                todo.completed = $(child).find('.app-input[type="checkbox"]').prop("checked");
                todoList.items.push(todo);
            });

            if (isNewList) {
                if (todoList.name.length > 0 && todoList.items.length > 0) {
                    saveTodoList("POST", todoList);  
                }
            } else {
                saveTodoList("PUT", todoList); 
            }
        });
    };

    function getUsernamesFromUserObjects(users) {
        return users.map( function(user) { return user['id']; });
    };
});
