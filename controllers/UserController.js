const db = require("../models");
const jwt = require("../configs/jwt");
const { User } = db;

module.exports = {
    signup: (req, res) => {
        User.create(req.body)
        res.send("You've created your user")
    },
    login: (req, res) => {
        const { id, username } = req.user
        res.json({ token: "Bearer " + jwt.sign({id}), username, id });
    },
    logout: (req, res) => {
        if(req.user) {
            req.session.destroy(err => {
                if (err) throw err;
                res.send({ message: "User logged out" });
            });
            req.logout();
        } else {
            res.send({ message: "no user to logout" });
        };
    }
};