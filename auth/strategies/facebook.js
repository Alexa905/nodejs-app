const Strategy = require('passport-facebook');

export const facebookStrategy = new Strategy({
		clientID: process.env.FACEBOOK_APP_ID || 'FACEBOOK_APP_ID',
		clientSecret: process.env.FACEBOOK_APP_SECRET || 'FACEBOOK_APP_SECRET',
		callbackURL: "http://localhost:3000/auth/facebook/callback"
	},
	function(accessToken, refreshToken, profile, cb) {
		let user = usersData.find(user =>user.facebookId === profile.id );
		return cb(null, user);

	}
)