App.controller('signup', function (page) {

    page.querySelector('#sign-in').addEventListener('click', function (event) {
        kik.getUser(function (user) {
            if (!user) {
                // need your permissions
            } else {
                App.load('home');
                // Spinner durin xhr + timeout

                // var xhr = null;
                // xhr = new XMLHttpRequest();
                // xhr.timeout = 0 // some number in milliseconds
                // xhr.ontimeout = function() {};
                // xhr.onreadystatechange = function() {
                //     if (xhr.readyState === 4 && xhr.status === 200) {
                //         console.log(xhr.responsetext)
                //     }
                // };
                // xhr.open("POST", "http://localhost:8080/users/");
                // xhr.send(null);
            }
        });
    });
});
