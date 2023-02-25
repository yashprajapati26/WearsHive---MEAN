require('dotenv').config()
const UserModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const localStorage = require("localStorage")
const bcrypt = require('bcrypt')
let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET


const postLogin = async (req, res) => {
    try {
        let email = req.body.email
        let pass = req.body.password

        if (!(email && pass)) {
            res.status(400).json({msg:"All field required"})
            return;
        }

        let user = await UserModel.findOne({
            email: email
        }).exec();

        let isAdmin = false
        
        if (await bcrypt.compare(pass, user.password)) {
            const token = jwt.sign({user_id: user._id,email}, jwtSecretKey, {expiresIn: "2h"})
            
            // save user token in localstorage

            localStorage.setItem('token', token)

            if (user.usertype) {
                if (user.usertype == "admin") isAdmin = true    
            }

            data = {
                "msg": "Login Sucessfully",
                "token": token,
                "isLogin": true,
                "isAdmin": isAdmin
            }
            return res.status(200).json(data)
        
        } 
        else {
            data = {"msg": "Please enter correct email and password !!"}
            res.status(401).json(data)
        }

    } catch (e) {
        console.log(e)
        data = {
            "msg": "Something is Wrong! Please try again.",
            "error": e.error
        }
        res.status(500).json(data)
        return;
    }
}


const postSignup = async (req, res) => {
    try {
        let name = req.body.name
        let mobile = req.body.mobile
        let email = req.body.email
        let pass = req.body.password
        let cpass = req.body.cpassword

        if (name != "" && mobile != "" && email != "" && pass != "" && cpass != "") {
            if (await UserModel.findOne({
                    email: email
                })) {
                return res.status(200).json({
                    msg: "Email is already used.Try diffrent Email Id for Register."
                })
            }
            if (pass == cpass) {
                let user = new UserModel({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: pass,
                    token: "",
                    usertype: "customer"
                })
                user.save()
                return res.status(200).json({
                    msg: "Register Sucessfully"
                })
            }
            else{
                return res.status(200).json({msg:"please enter both password same !"})
            }
        } else {
            return res.status(200).json({
                msg: "Please enter all details"
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(500).json({msg:e})
    }
}


const logout = async (req, res) => {
    // const token = req.body.token || req.query.token  || req.cookies.token || req.headers['authorization'] || localStorage.getItem('token');
    token = localStorage.getItem("token")
    console.log(token)
    if (token) {
        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        //remove from local storage  
        localStorage.removeItem("token")

        //delete token from database
        // const userInfo = await User.findOne({ _id: verifyToken.user_id })
        // if (userInfo.token) {
        //     userInfo.token = null
        //     await userInfo.save();
        // }

        //delete token from cookie
        // res.clearCookie("token", { path: "/" });

        //delete token from header 
        // res.removeHeader('Authorization');

        res.status(200).json({
            "msg": "logout sucessfully"
        })
    } else {
        res.status(200).json({
            code: 401,
            "msg": "token not find"
        })
    }

}

module.exports = {
    postLogin,
    logout,
    postSignup
}