require('dotenv').config();
const bodyParser = require('body-parser');

function start() {
    /// import configuration /////////////////////////////////////////////////
    const config = require('./config.js');
    /// Initialize Logging///////////////////

    const cors = require('cors');
    const express = require('express');
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    /// cross domain
    app.use(cors());

    // set the view engine to ejs
    app.set('view engine', 'ejs');

    /// Register controller/////////////////////////////////////////////////////////////////
    console.log('register controllers');
    const controllers = require('./controllers/controllerRegistrar.js');
    controllers(app, config);

    // Set up API routes
    console.log("setupApiRoutes");
    const setupApiRoutes = require('./apis/setupApiRoutes.js')(app, config);
    
    // run test /////////////////////////////////////////////////////////////////
    setupApiRoutes('analyze_counter_state');

    /// Expose static content /////////////////////////////////////////////////////////////////
    const staticContent = [{route:'/', path:'/../public/'}]
    for (let i = 0; i < staticContent.length; i++) {
        app.use(staticContent[i].route, express.static(__dirname + staticContent[i].path));
    } 
    
    // Handle others requests 400, 500  - Keep this as a last route
    const errorHandler = require('./controllers/errorHandlers/error.js');
    errorHandler(app);

    // Start the server
    const PORT = process.env.PORT || 8008;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();