const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    create: function (req, res, next) {
        console.log("===========================================", req.body);

        userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }, (err, result) => {
            if (err)
                next(err);
            else
                res.json({
                    status: result.status,
                    message: 'User Added Successfully!!!',
                    data: null
                });
        });
    },

    authenticate: function (req, res, next) {

        userModel.findOne({ email: req.body.email }, (err, usrInfo) => {
            if (err)
                next(err);
            else {
                if (bcrypt.compareSync(req.body.password, usrInfo.password)) {
                    const token = jwt.sign({ id: usrInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });

                    res.json({
                        status: 'Success',
                        message: 'User Found!!!',
                        data: {
                            user: usrInfo,
                            token: token
                        }
                    });
                } else {
                    res.json({
                        status: 'Error',
                        message: 'Invalid email/password!!!',
                        data: null
                    });
                }
            }
        });
    }
}