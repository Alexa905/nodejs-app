const express = require('express');
const app = express();
const bodyParser = require("body-parser");
import { cookieParser, queryParser, errorHandler} from './middlewares';
import { products, users } from './routes';


app.use(errorHandler);
app.use(cookieParser);
app.use(queryParser);
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/products', products);

module.exports = app;




