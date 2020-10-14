const db = require("../models");
const jwt = require("../configs/jwt");
const { User } = db;

module.exports = {
    signup: (req, res) => {
        User.create(req.body)
        res.send("You've created your user")
    },
    login: (req, res) => {
        const { id } = req.user
        res.json({ token: jwt.sign({id}), token_type: "Bearer" });
    },
    logout: (req, res) => {
        console.log(req.user)
        // if(req.user) {
        //     req.session.destroy(err => {
        //         if (err) throw err;
        //         res.send({ message: "User logged out" });
        //     });
        //     req.logout();
        // } else {
        //     res.send({ message: "no user to logout" });
        // };
        req.logout();
    },
    getUser: async (req, res) => {
        const { id } = req.params
        const data = await User.findById(id)
        res.json(data)
    }
};