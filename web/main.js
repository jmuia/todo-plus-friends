(function (App) {
    App.enableDragTransition();

    try {
        App.restore();
    } catch (err) {
        if (kik.haspermission) {
            App.load('home');    
        } else {
            App.load('signup')
        }
        
    }

})(App);
