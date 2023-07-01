const errorResponse = require('../apis/errorResponse');

function controllerHandler(route, testPath) {
    if (route == undefined)
        throw new Error('route undefined');
    if (testPath == undefined)
        console.warn('> Warning: Test undefined for ' + route);
    else
        this.testPath = testPath;

    if (route[route.length - 1] == '/') route = route.substring(0, route.length - 1);

    this.route = route;
    this.app = null;

}

controllerHandler.prototype = {
    requireTest: function () {
        return this.testPath ? require(this.testPath) : {
            test: function () {
                return true
            }
        };
    }

    , validateData: function (req, res, callback) {
        callback(new Error("validateData not implemented for " + this.route));
    }

    , init: function (req, res) {
        /// used to initialize the api before logic run
    }
    , _createHandler: function (verbHandler) {
        let t = this;
        let validatationWrapper = function (req, res) {
            t.init(req, res);
            if (t.validateData(req, res)) {
                verbHandler(req, res);
            }
            else {
                errorResponse.sendValidationError(res, "Invalid Parameters");
            }
        };

        return validatationWrapper;

    }
    , register: function (app) {

        this.app = app;
        if (this._beforeRegister)
            this._beforeRegister();
        if (this.get) {
            app.get(this.route, this._createHandler(this.get));
            //app.get(this.route + "/:key", this._createHandler(this.get));
        }

        if (this.post)
            app.post(this.route, this._createHandler(this.post));
        if (this.put) {
            app.put(this.route, this._createHandler(this.put));
            //app.put(this.route + "/:key", this._createHandler(this.put));
        }

        if (this.delete) {
            app.delete(this.route, this._createHandler(this.delete));
            //app.delete(this.route + "/:key", this._createHandler(this.delete));
        }

        if (this._afterRegister)
            this._afterRegister();
    }
    , _afterRegister: undefined
    , _beforeRegister: undefined
    , get: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , post: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , put: undefined ///function ( req, res, callback ) { callback( "error" ); }
    , del: undefined ///function ( req, res, callback ) { callback( "error" ); }
};

module.exports = controllerHandler;