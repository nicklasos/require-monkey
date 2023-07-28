/**
 * Replace require with anything
 * For unit testing purposes
 *
 * monkey('node-fetch', () => console.log('replaced'));
 *
 * @param {string} module
 * @param replace
 */
function monkey(module, replace) {
    var required = require(module);

    if (require.cache.hasOwnProperty(require.resolve(module))) {
        require.cache[require.resolve(module)].exports = replace;
    } else {
        for (var name in replace) {
            if (replace.hasOwnProperty(name) && required.hasOwnProperty(name)) {
                required[name] = replace[name];
            }
        }
    }
}

module.exports = monkey;
