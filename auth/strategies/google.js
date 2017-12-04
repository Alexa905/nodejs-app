const Strategy = require('passport-google-oauth20');
import {usersData} from "../../data/users";

export const googleStrategy = new Strategy({
		clientID: process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID',
		clientSecret: process.env.GOOGLE_CLIENT_SECRET|| 'GOOGLE_CLIENT_SECRET',
		callbackURL: process.env.GOOGLE_CALLBACK || "GOOGLE_CALLBACK"
	},
	function (accessToken, refreshToken, profile, cb) {
		let user = usersData.find(user =>user.googleId === profile.id );
		return cb(null, user);

	});