App.controller('home', function (page) {
    var $tmpl = $(page).find('ul li.app-button').remove();
    var $lists = $(page).find('ul.app-list');

    function fetchLists(username) {
        API.auth('GET','/users/'+username, '', function (res, status) {
            if (status !== 200) {
                App.dialog({
                    title        : 'Sign in failed',
                    text         : 'Looks like there was an issue signing in. Try again in a bit.',
                    cancelButton : 'Close'
                });
            } else {
                res.todo_lists.forEach(function (todo) {
                    var obs = observable(todo);
                    App.lists.addList(obs);
                });
            }
        });
    };

    App.lists.subscribe(function (obs) {
        var $list = $tmpl.clone(true);
        $list.text(obs().name);

        obs.subscribe(function (newTodo) {
            $list.text(newTodo.name);
        });

        $list.on('click', function (event) {
            App.load('todoList', {observer: obs});
        });

        $lists.append($list);
    });

    // Get user's todo lists (order by so can use recents)
    kik.getUser(function (user) {
        if (user) fetchLists(user.username);
    });

    // Setup listener for new list
    var $newList = $(page).find('.android-new');
    $newList.on('click', function (event) {
        App.load('todoList');
    });

});
