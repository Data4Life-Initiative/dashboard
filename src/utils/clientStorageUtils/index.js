export const get = function (key) {
    return localStorage.getItem(key);
};

export const set = function (key, value) {
    localStorage.setItem(key, value);
};

export const remove = function (key) {
    localStorage.removeItem(key);
};
