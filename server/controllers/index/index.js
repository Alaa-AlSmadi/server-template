const controllerHandler = require('../controllerHandler.js');

function createController(app) {
    const handler = new controllerHandler('/', '');

    handler.validateData = function (req, res) {
        // there's no condition to run this controllers
        return true;
    };

    handler.get = function (req, res) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render(__dirname + '/index.ejs');
    };

    /*don't delete this*/
    app.get('/index.html', function (req, res) {
        res.redirect('/');
    });

    return handler;
}

module.exports = createController;