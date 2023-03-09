import express from 'express';
import path from 'path';
import hbs from 'hbs';
import morgan from 'morgan';
import multer from 'multer';
import bodyParser from 'body-parser';
import crm from './api/routes/crm';
import webRoutes from './api/routes/webRoutes';
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

var fileObj = {};
// Serve Static Files
app.use('/static', express.static('public'));

//Upload Files
const Storage = multer.diskStorage({
  destination:"./public/uploads/",
  filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
      fileObj = file.fieldname+"_"+Date.now()+path.extname(file.originalname);
  }
})

let upload = multer({storage:Storage});

app.post('/upload', upload.single('image') ,(req, res) => {
  res.send(fileObj);
})

// To serve user queries
app.use('/', webRoutes);
app.use('/crm', crm);

// Get saved data from sessionStorage
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
