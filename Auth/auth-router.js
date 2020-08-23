const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const {isValid} = require('../users/users-service.js');

const db = require('../database/dbConfig.js');
const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {
    const user = req.body;
    
    if (user.username && user.password && user.email) {
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        Users.add(user)
            .then(() => {
                res.status(201).json({ message: `welcome ${user.username}`});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error registering new user", err}, )});
    } else {
        res.status(400).json({ message: "Missing username or password"});
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
        Users.findUser({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                let token = generateToken(user);
                res.status(200).json({ message: "Welcome to our API", token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: error.message });
        });
    } else {
        res.status(400).json({
            message: "please provide username and password and the password shoud be alphanumeric",
        });
    };
});

function generateToken(user) {
    const payload = {
        subject: user.name,
        username: user.username,
    };
    const options = {
        expiresIn: '1h'
    }
    const secret = secrets.jwtSecret;

    return jwt.sign(payload, secret, options);
}

module.exports = router;
