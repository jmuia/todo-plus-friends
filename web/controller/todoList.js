App.controller('todoList', function (page, object) {
    obs = object.func;

    todoList = obs();

    $appTitle = $(page).find('.app-title').text(todoList.name || "Default");

    var $tmpl = $(page).find('.todo-item').remove();
    var $todos = $(page).find('.todos');

    if (todoList && todoList.todo_items) {
        todoList.todo_items.forEach(function (item) {
            var $todo = $tmpl.clone(true);
            $todo.find('.app-input[type="input"]').val(item.description);
            $todo.find('.app-input[type="checkbox"]').prop("checked", item.completed);
            $todos.append($todo);
        });
    }


    // Tear Down / Save Changes  ------------------------------------------------------------------
    $(page).on('appBack', function () {
        todoList = {};
        todoList.todo_items = [];
        
        todoList.name = $appTitle.text();

        $todos.children().each(function (index, child) {
            var todo = {};
            todo.description = $(child).find('.app-input[type="input"]').val();
            todo.completed = $(child).find('.app-input[type="checkbox"]').prop("checked");
            todoList.todo_items.push(todo);
        });

        obs(todoList);

        // !!! TODO - post and save
        // $.post('/create', todoList, function (response){
        // });

    });
});
