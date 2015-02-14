(function (App) {
    App.enableDragTransition();

    try {
        App.restore();
    } catch (err) {
        App.load('home');
    }
})(App);
