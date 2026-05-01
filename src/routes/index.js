const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    let previousUser = req.cookies.user;
    let currentUser = req.session.user;

    if (!currentUser && previousUser) {
        return res.send(`Welcome back last time you logged in as ${previousUser}`);
    }

    res.send('Welcome to the online course platform');
});

router.post('/login', (req, res) => {
    const username = req.body.username;
    const role = req.body.role;

    if (!username || !role) {
        return res.status(400).send('Username and role are required');
    }

    req.session.user = {
        username: username,
        role: role
    };

    res.cookie('user', username, { maxAge: 30 * 24 * 60 * 60 * 1000 });

    res.send('Login successful');
});

router.get('/courses', (req, res) => {
    let currentUser = req.session.user;

    if (!currentUser) {
        return res.status(401).send('Please log in first');
    }

    res.send('You can view courses');
});

router.get('/create-course', (req, res) => {
    let currentUser = req.session.user;

    if (!currentUser) {
        return res.status(401).send('Please log in first');
    }

    if (currentUser.role !== 'instructor') {
        return res.status(403).send('access denied');
    }

    res.send('You can create courses');
});

router.get('/profile', (req, res) => {
    let currentUser = req.session.user;

    if (!currentUser) {
        return res.status(401).send('Please log in first');
    }

    res.send(`Username: ${currentUser.username}, Role: ${currentUser.role}`);
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }

        res.clearCookie('connect.sid');

        res.send('Logout successful');
    });
});

module.exports = router;