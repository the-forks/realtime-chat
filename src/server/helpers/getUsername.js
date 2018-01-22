module.exports = function () {
    const names = require('../usernames.json');
    const randomEl = function (list) {
        var i = Math.floor(Math.random() * list.length);
        return list[i];
    }

    return randomEl(names.adjectives) + ' ' + randomEl(names.nouns)
}
