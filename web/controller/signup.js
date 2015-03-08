App.controller('signup', function (page) {

    page.querySelector('#sign-in').addEventListener('click', function (event) {
        API.auth('POST','/users', '', function (res, status) {
            if (status !== 200) {
                App.dialog({
                    title        : 'Sign in failed',
                    text         : 'Looks like there was an issue signing in. Try again in a bit.',
                    cancelButton : 'Close'
                });
            } else {
                App.load('home');
            }
        });
    });
});
