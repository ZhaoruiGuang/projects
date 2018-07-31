var localStorage = window.localStorage;


function setItem(key, value) {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
    return value;
}
function getItem(key, defaultValue) {
    var result = null;
    try {
        var resultStr = localStorage.getItem(key);
        if (resultStr) {
            result = JSON.parse(resultStr);
        }
        else {
            result = defaultValue;
            localStorage.setItem(key, JSON.stringify(result));
        }
    }
    catch (e) {
        result = defaultValue;
        localStorage.setItem(key, JSON.stringify(result));
    }
    return result;
}
function removeItem(key) {
    localStorage.removeItem(key);
}
function clear() {
    localStorage.clear();
}

module.exports = {
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    clear: clear
};
