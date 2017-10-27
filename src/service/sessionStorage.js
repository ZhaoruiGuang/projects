var sessionStorage = window.sessionStorage;


function setItem(key, value) {
    if (sessionStorage) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    return value;
}
function getItem(key, defaultValue) {
    var result = null;
    try {
        var resultStr = sessionStorage.getItem(key);
        if (resultStr) {
            result = JSON.parse(resultStr);
        }
        else {
            result = defaultValue;
            sessionStorage.removeItem(key);
        }
      
    }
    catch (e) {
        result = defaultValue;
        sessionStorage.removeItem(key);
    }
    return result;
}
function removeItem(key) {
    sessionStorage.removeItem(key);
}
function clear() {
    sessionStorage.clear();
}

module.exports = {
    setItem: setItem,
    getItem: getItem,
    removeItem: removeItem,
    clear: clear
};
