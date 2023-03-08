import express from "express";
import path from "path";
const router = express.Router();
const dirname = path.resolve(path.dirname(''));

// Qodemart main websites
router.get('/', (req, res) => {
    res.render(path.join(dirname, './views/index.hbs'));
});

router.get('/shop', (req, res) => {
    res.render(path.join(dirname, './views/shop.hbs'));
});

router.get('/detail', (req, res) => {
    res.render(path.join(dirname, './views/detail.hbs'));
});

router.get('/cart', (req, res) => {
    res.render(path.join(dirname, './views/cart.hbs'));
});

router.get('/checkout', (req, res) => {
    res.render(path.join(dirname, './views/checkout.hbs'));
});

router.get('/contact', (req, res) => {
    res.render(path.join(dirname, './views/contact.hbs'));
});


export default router;