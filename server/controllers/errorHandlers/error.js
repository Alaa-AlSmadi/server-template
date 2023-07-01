const util = require('util');

module.exports = function (app) {

    app.use(function (err, req, res, next) {
        if (!err)
            err = {};
        var message = util.inspect({ error: err, stack: err.stack }, { showHidden: false, depth: 10 });
        message.method = req.method;
        message.url = req.originalUrl;
        console.error(message);

        if (req && req.originalUrl && req.originalUrl.indexOf('/api/') > -1) {
            res.send(err.statusCode || 500);
        }
        else {
            res.status(err.statusCode || 500);
            res.render(__dirname + '/500.ejs');
        }
    });

    app.use(function (req, res, next) {
        res.status(404);
        res.render(__dirname + '/404.ejs');
    });
};