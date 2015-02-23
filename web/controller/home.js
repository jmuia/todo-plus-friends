App.controller('home', function (page) {

    // Get user's todo lists (order by so can use recents)
    $.getJSON("/testdata/todos.json", function (data){
        var $tmpl = $(page).find('ul li.app-button').remove();
        var $lists = $(page).find('ul.app-list');

        data.forEach(function (todo) {
            var obs = observable(todo);

            var $list = $tmpl.clone(true);
            $list.text(obs().name);
            $list.on('click', function (event) {
                App.load('todoList', { func: obs });
            });

            obs.subscribe( function (newTodo) { 
                $list.text(newTodo.name);
            });

            $lists.append($list);
        });
    })

    // Setup listener for new list
    var $newList = $(page).find('.android-new');
    $newList.on('click', function (event) {
        App.load('todoList', {});
    });

    // page.querySelector('#new-user').addEventListener('click', function (event) {
    //     kik.sign('', function (signedData, username, host) {
    //         if ( !signedData ) {
    //             console.log("sign data failed");
    //         } else {
    //             var xhr = null;
    //             xhr = new XMLHttpRequest();
    //             xhr.onreadystatechange = function() {
    //                 if (xhr.readyState === 4 && xhr.status === 200) {
    //                     console.log(xhr.responsetext)
    //                 }
    //             };
    //             xhr.open("POST", "https://58041343.ngrok.com/users/");
    //             xhr.send(signedData);
    //         }
    //     });
    // });

    // page.querySelector('#new-todo').addEventListener('click', function (event) {
    //     kik.getUser(function (user) {
    //         if (!user) {

    //         } else {
    //             var xhr = null;
    //             xhr = new XMLHttpRequest();
    //             xhr.onreadystatechange = function() {
    //                 if (xhr.readyState === 4 && xhr.status === 200) {
    //                     console.log(xhr.responsetext)
    //                 }
    //             };
    //             xhr.open("POST", "http://localhost:8080/users/"+user.username+"/todo-lists/");
    //             xhr.send(null);
    //         }
    //     });
    // });
});
