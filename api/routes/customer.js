import express from "express";
import path from "path";
const router = express.Router();
const dirname = path.resolve(path.dirname(''));

router.get('/dashboard', function (req, res) {
    res.render(path.join(dirname , './views/Customer/dashboard_cust.hbs'));
});

router.get('/orders', (req, res) => {
    res.render(path.join(dirname , './views/Customer/orders.hbs'));
});

router.get('/profile', (req, res) => {
    res.render(path.join(dirname , './views/Customer/profile.hbs'));
});

export default router;
