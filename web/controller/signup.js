App.controller('signup', function (page) {
    console.log('sign in');

    function signin(username) {
        console.log('signin called');
        kik.sign('', function (signedData, username, host) {
            if (!signedData) {
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:8080/users',
                    data: signedData,
                    success: function(data){
                        console.log(data);
                        App.load('home', data.todo_lists);
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

    page.querySelector('#sign-in').addEventListener('click', function (event) {
        kik.getUser(function (user) {
            if (!user) {
                // need your permissions
            } else {
                signin(user.username);
            }
        });
    });
});
