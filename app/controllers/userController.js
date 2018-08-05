'use strict';

// The user controller.
const UserController = {
    index: function(req, res) {
        res.status(200).json({ message: 'Welcome to the users area ' + req.user.email + '!' });
    }
};

module.exports = UserController;