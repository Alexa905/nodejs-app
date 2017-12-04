const express = require('express');
const passport = require('passport');
const app = express();
const bodyParser = require("body-parser");
import {localStrategy, bearerStrategy, googleStrategy, twitterStrategy, facebookStrategy, serialize, deserialize} from "./auth/strategies";
import {verifyToken, cookieParser, errorHandler, queryParser} from "./middlewares";
import {auth, errorPage, products, users, homePage} from "./routes";

passport.use(localStrategy);
passport.use(bearerStrategy);
passport.use(googleStrategy);
passport.use(twitterStrategy);
passport.use(facebookStrategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialize);

app.use(errorHandler);
app.use(cookieParser);
app.use(queryParser);
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/login', passport.authenticate('local', { failureRedirect: '/api/auth/404', successRedirect: '/api/homepage', session: false }));
app.use('/api/users', verifyToken, users);
app.use('/api/products', verifyToken, products);
app.use('/api/auth', auth);
app.use('/api/auth/404', errorPage);
app.use('/api/homepage', homePage);
app.use('/api/auth/google', passport.authenticate('google', { scope: ['profile'] }));

module.exports = app;




