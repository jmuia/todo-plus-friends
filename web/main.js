(function (App) {
    App.enableDragTransition();

    App.lists = function () {
        var listeners = [];
        var lists = [];
        var func = {};

        function notify(list) {
            listeners.forEach(function listener(listener) { listener(list); });
        }

        func.subscribe = function (listener) { listeners.push(listener); };
        
        func.addList = function(list) {
            lists.push(list);
            notify(list);
            return list;
        }

        func.getLists = function() {
            return lists;
        }

        return func;
    }();

    try {
        App.restore();
    } catch (err) {
        if (kik.haspermission) {
            App.load('home');
        } else {
            App.load('signup');
        }   
    }

})(App);
