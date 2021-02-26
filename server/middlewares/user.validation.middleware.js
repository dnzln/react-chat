const { user } = require('../models/user');
const createUserValid = (req, res, next) => {

    let validationPassed = true;

    try {
        
        for (let key in req.body) {
            if (!user.hasOwnProperty(key)) throw Error('Unknown property');
        }

        const newUserData = {};        

        for (let key in user) {
            if (!req.body[key] && key != 'id') throw Error('Empty fields');
            if (key != 'id') newUserData[key] = req.body[key];
        }

    } catch (err) {
        res.err = err;
        validationPassed = false;
    } finally {
        res.validationPassed = validationPassed;
        next();
    }
}

const updateUserValid = (req, res, next) => {

    let validationPassed = true;

    try {
        const userData = req.body;
        
        for (let key in userData) {
            if (!userData[key]) throw Error('Property is empty');
        }
    } catch (err) {
        res.err = err;
        validationPassed = false;
    } finally {
        res.validationPassed = validationPassed;
        next();
    }
}


exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;