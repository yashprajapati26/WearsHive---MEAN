const User = require("../models/user.model");
const UserModel = require("../models/user.model");
const mongoType = require('mongoose').Types;
const bcrypt = require('bcrypt')

const getSingleUser = async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            let user = await UserModel.findById(req.params.id);
            let data = {
                user: user
            }
            // res.status(200).render("../templates/edituser", data)
            res.status(200).json({
                user: user,
                status: "success"
            });
        } else {
            res.status(401).json({
                msg: "Id not valid"
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const getUsers = async (req, res) => {
    try {
        // adding pagination 
        const limitValue = req.params.pageSize || 5;
        const skipValue = req.params.page || 1;
        console.log("params : ", req.params)
        const users = await UserModel.find().limit(limitValue).skip(skipValue);

        // res.status(200).render('../templates/users', data)
        res.status(200).json({
            data: users,
            status: "success"
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}


const createUser = async (req, res) => {
    try {
        let user = new UserModel({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: await bcrypt.hash(req.body.password,10),
            token: "",
            usertype: "customer"
        })

        if (user.name != "" && user.email != "" && user.mobile != "" && user.password != "") {
            const response = await user.save();
            // res.status(200).redirect("/home")
            res.status(200).json({
                data: user,
                msg: "Data Save Sucessfully",
                status: "success"
            });

        } else {
            res.status(400).json({
                data: user,
                msg: "All field required",
                status: "fail"
            });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            error: err.message
        });
    }
}


const updateUser = async (req, res) => {
    try {
        let user = {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        };

        if (mongoType.ObjectId.isValid(req.params.id)) {
            if (user.name != "" && user.email != "" && user.mobile != "" && user.password != "") {
                await UserModel.findByIdAndUpdate(req.params.id, {
                    $set: user
                });
                // res.status(200).redirect('/getusers');
                res.status(200).json({
                    data: user,
                    msg: "Data Update Sucessfully",
                    status: "success"
                });
            } else {
                res.status(400).json({
                    data: user,
                    msg: "All field required",
                    status: "fail"
                });
            }
        } else {
            res.status(401).json({
                msg: "Id not valid"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        if (mongoType.ObjectId.isValid(req.params.id)) {
            await UserModel.findByIdAndRemove(req.params.id);
            // res.status(200).redirect('/getusers')
            res.status(200).json({
                msg: "Data Deleted Sucessfully",
                status: "success"
            });
        } else {
            res.status(401).json({
                msg: "Id not valid"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

const searchUser = async (req, res) => {
    try {
        key = req.params.key;
        console.log("key:", key)
        var regexQuery = {
            name: new RegExp(key, 'i'),
            // email: new RegExp(key, 'i')
        }
        let users = await UserModel.find(regexQuery).exec()
        console.log(users)
        res.status(200).json({
            users: users
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}


module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getSingleUser,
    searchUser
};