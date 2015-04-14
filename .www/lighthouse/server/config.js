"use strict";
/*global Meteor : false */
/*global process : false */

Meteor.startup(function(){
	Meteor.Auth = {
		github  : {
			basic : {
				type: "basic",
				username: process.env.GITHUB_USER,
				password: process.env.GITHUB_PWD
			},
			token : {
				type: "oauth",
				token: process.env.GITHUB_TOKEN
			}
		},
		tumblr : {
			consumer_key: process.env.TUMBLR_KEY,
			consumer_secret: process.env.TUMBLR_SECRET
			//token: 'OAuth Access Token',
			//token_secret: 'OAuth Access Token Secret'
		}
	};
});