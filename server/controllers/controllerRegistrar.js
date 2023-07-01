const fs = require('fs');

module.exports = function (app, config) {

    let apis = new Array();

    function loadAPI(path, file, loadSubFolders) {

        if (file.indexOf('.') == 0 || file.indexOf('.ejs') > -1) {
            return;
        } else if (file.indexOf('.') > 0) {
            if(file != 'controllerRegistrar.js' && file != 'controllerHandler.js' && file != 'error.js'){
                let fn = require(path + "/" + file);
                if (typeof (fn) != 'function') return;
                let api = fn(app);
                if (api && api.register) {
                    apis.push(api);
                    api.register(app);
                }
            }
        } else if (loadSubFolders) {
            let subpath = path + '/' + file;
            fs.readdirSync(subpath).forEach(function (file) {
                loadAPI(subpath, file, true)
            });
        }
    }

    fs.readdirSync(__dirname + "/").forEach(function (file) {
        loadAPI(__dirname + "/", file, true);
    });

    /// Test API's /////////////////////////////////////////////////////////////////
    function testAPIs(testName) {
        if (!testName && process.env.TEST_NAME) {
            testName = process.env.TEST_NAME.toLowerCase();
        }
        if (testName) testName = testName.toLowerCase();
        for (let i = 0; i < apis.length; i++) {
            if (!testName || (apis[i].requireTest().name && apis[i].requireTest().name.toLowerCase() == testName)) {
                apis[i].requireTest().test(app);
            }
        }
    }

    return testAPIs;
};