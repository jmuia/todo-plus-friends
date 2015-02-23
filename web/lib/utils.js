function request(method, url, data, callback) {
    if (typeof(data) === "function") {
        callback = data;
        data = null;
    }

    var xhr = null;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) callback(xhr.status, xhr.responseText);
    };
    
    xhr.open(method, url);
    xhr.send(data);
}


function observable (value) {
    var listeners = [];

    function notify (newValue) {
        listeners.forEach(function (listener) { listener(newValue); });
    }

    function accessor (newValue) {
        if (newValue && newValue !== value) {
            value = newValue;
            notify(newValue);
        }
        return value;
    }

    accessor.subscribe = function (listener) { listeners.push(listener); };

    return accessor;
}