App.controller('home', function (page) {
    var $tmpl = $(page).find('ul li.app-button').remove();
    var $lists = $(page).find('ul.app-list');

    function fetchLists(username) {
        console.log('fetchLists');
        var get_payload = '/users/'+username;
        kik.sign(get_payload, function (signedData, username, host) {
            if (!signedData) {
            } else {
                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8080/users/'+username,
                    headers: {
                        'X-Kik-JWS': signedData
                    },
                    data: {
                        'u': username,
                        'd': host
                    },
                    success: function(data){
                        console.log(data);
                        data.todo_lists.forEach(function (todo) {
                            var obs = observable(todo);
                            App.lists.addList(obs);
                        });
                    },
                    error: function(xhr, type){
                        App.dialog({
                          title        : 'Sign in failed',
                          text         : 'Looks like there was an issue signing in. Try again in a bit.',
                          cancelButton : 'Close'
                        });
                    }
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
