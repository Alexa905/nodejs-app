const Strategy = require('passport-twitter');
import {usersData} from "../../data/users";

export const twitterStrategy = new Strategy({
		consumerKey: process.env.TWITTER_CONSUMER_KEY || 'TWITTER_CONSUMER_KEY',
		consumerSecret: process.env.TWITTER_CONSUMER_SECRET || 'TWITTER_CONSUMER_SECRET',
		callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
	},
	function(token, tokenSecret, profile, cb) {
		let user = usersData.find(user =>user.twitterId === profile.id );
		return cb(null, user);
	}
)