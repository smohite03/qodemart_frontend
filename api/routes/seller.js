import express from "express";
import path from "path";
const router = express.Router();
const dirname = path.resolve(path.dirname(''));

router.get('/dashboard', function (req, res) {
    res.render(path.join(dirname , './views/Seller/dashboard_seller.hbs'));
});

router.get('/orders', (req, res) => {
    res.render(path.join(dirname , './views/Seller/orders.hbs'));
});

router.get('/profile', (req, res) => {
    res.render(path.join(dirname , './views/Seller/profile.hbs'));
});

router.get('/products', (req, res) => {
    res.render(path.join(dirname , './views/Seller/products.hbs'));
});

router.get('/query', (req, res) => {
    res.render(path.join(dirname , './views/Seller/query.hbs'));
});

export default router;



// app.get('/profile',(req,res)=>{
//     res.status(200).send("shi chal rha h");
// });

// app.post('/profile',(req,res)=>{

   
//    console.log(typeof req.body);
//    let arrayOfKeys = Object.keys(req.body);
//    if(Object.keys(req.body));
//    res.send("done");

// });

// app.get('/register',()=>{
//     res.send("yhi h register");
// })

// app.post('/register',()=>{
      
//    console.log(typeof req.body);
//    let arrayOfKeys = Object.keys(req.body);
//    if(Object.keys(req.body));
//    res.send("done");
// })