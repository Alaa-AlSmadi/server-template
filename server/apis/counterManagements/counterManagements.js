const apiHandler = require('../apiHandler');

let counter = 0;

function createAPI(app) {
    let handler = new apiHandler('/api/counterManagements', './counterManagements/counterManagements.test.js');

    handler.validationError = "'type && value' are required for analyzing state";

    handler.validateData = function (req, res) {
        return true;
    };

    handler.post = async function (req, res) {
        if (req.body && req.body.type && typeof req.body.value === 'number') {
            try {
                const type = req.body.type;
                const value = req.body.value;

                switch (type) {
                    case 'increase':
                        counter += value;
                        break;
                    case 'decrease':
                        counter -= value;
                        break;
                    default:
                        break;
                }
                res.status(200).json({ counter });
            } catch (error) {
                res.status(500).json({ message: 'Error occurred while changing the state' });
            }
        } else {
            res.status(400).json({ message: handler.validationError });
        }
    };

    handler.get = async function (req, res) {
        try {
            res.status(200).json({ counter });
        } catch (err) {
            res.status(500).json({ message: 'Error occurred while getting the state' });
        }
    }

    return handler;
}
module.exports = createAPI;