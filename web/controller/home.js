App.controller('home', function (page) {
    var $tmpl = $(page).find('ul li.app-button').remove();
    var $lists = $(page).find('ul.app-list');

    function fetchLists(username) {
        API.auth('GET','/users/'+username+'/todo-lists', '', function (res, status) {
            if (status !== 200) {
                App.dialog({
                    title        : 'Sign in failed',
                    text         : 'Looks like there was an issue signing in. Try again in a bit.',
                    cancelButton : 'Close'
                });
            } else {
                console.log(res);
                res.forEach(function (todo) {
                    var obs = observable(todo);
                    App.lists.addList(obs);
                });
            }
        });
    };

    function bindValue(input, property, observable) {
      input.value = observable();
      observable.subscribe(function(){ input.value = observable(); });
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
    if (kik.utils.platform.os.name === 'android') {
        var $newList = $(page).find('.android-add-button');
    } else {
        var $newList = $(page).find('.ios-add-button');
    }
    $newList.on('click', function (event) {
        App.load('todoList');
    });

});
