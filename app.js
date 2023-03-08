import express from 'express';
import path from 'path';
import hbs from 'hbs';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import crm from './api/routes/crm';
import crmCustomer from './api/routes/customer';
import crmSeller from './api/routes/seller';

const app = express();

// Built in middleware
const dirname = path.resolve(path.dirname(''));
const partialPath = path.join(dirname, 'views/partials');

// Set the view engine
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

app.use(morgan('dev'));

// For body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'qwertyuiop',
  resave: true,
  saveUninitialized: true,
}));

// To handle CORS Errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Serve Static Files
app.use('/static', express.static('public'));

// Qodemart main websites
app.get('/', (req, res) => {
  res.render(path.join(dirname, './views/index.hbs'));
});

app.get('/shop', (req, res) => {
  res.render(path.join(dirname, './views/shop.hbs'));
});

app.get('/detail', (req, res) => {
  res.render(path.join(dirname, './views/detail.hbs'));
});

app.get('/cart', (req, res) => {
  res.render(path.join(dirname, './views/cart.hbs'));
});

app.get('/checkout', (req, res) => {
  res.render(path.join(dirname, './views/checkout.hbs'));
});

app.get('/contact', (req, res) => {
  res.render(path.join(dirname, './views/contact.hbs'));
});

// To Serve CRM
// To serve user queries
app.use('/crm', crm);
app.use('/crm/customer', crmCustomer);
app.use('/crm/seller', crmSeller);

// Serve Static Files
app.use('/static', express.static('public'));

// To resolve 404 (URI Not Found) Error
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// To resolve 500 (Internal Server) Error
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
