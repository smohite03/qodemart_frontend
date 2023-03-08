import http from 'http';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.DEV_PORT || 8000;
const server = http.createServer(app);
server.listen(port);
