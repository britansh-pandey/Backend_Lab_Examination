const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    let pichlaUser = req.cookies.user;
    let abhiKaUser = req.session.current_user;

    if (!abhiKaUser && pichlaUser) {
        return res.send(`Welcome back last time you logged in as ${pichlaUser}`);
    }

    res.send('Welcome to the online course platform');
});

router.post('/login', (req, res) => {
    const naam = req.body.username;
    const kaam = req.body.role;

    if (!naam || !kaam) {
        return res.status(400).send('Username and role are required');
    }

    req.session.current_user = {
        naam: naam,
        kaam: kaam
    };

    res.cookie('user', naam, { maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.send('Login successful');
});

router.get('/courses', (req, res) => {
    let checkUser = req.session.current_user;

    if (!checkUser) {
        return res.status(401).send('Please log in first');
    }

    res.send('You can view courses');
});

router.get('/create-course', (req, res) => {
    let checkUser = req.session.current_user;

    if (!checkUser) {
        return res.status(401).send('Please log in first');
    }

    if (checkUser.kaam !== 'instructor') {
        return res.status(403).send('access denied');
    }

    res.send('You can create courses');
});

router.get('/profile', (req, res) => {
    let loggedInUser = req.session.current_user;

    if (!loggedInUser) {
        return res.status(401).send('Please log in first');
    }

    res.send(`Username: ${loggedInUser.naam}, Role: ${loggedInUser.kaam}`);
});

router.get('/logout', (req, res) => {
    req.session.destroy(galti => {
        if (galti) {
            return res.status(500).send('Error logging out');
        }

        res.clearCookie('connect.sid');

        res.send('Logout successful');
    });
});

module.exports = router;