import express from "express";
import path from "path";
const router = express.Router();
const dirname = path.resolve(path.dirname(''));

router.get('/', function (req, res) {
    res.render(path.join(dirname , './views/login.hbs'));
});

router.get('/register', (req, res) => {
    res.render(path.join(dirname , './views/register.hbs'));
});

router.get('/forgot-password', (req, res) => {
    res.render(path.join(dirname , './views/forgot-password.hbs'));
});


export default router;
