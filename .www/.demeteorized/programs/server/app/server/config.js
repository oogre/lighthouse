(function(){"use strict";
/*global Meteor : false */

Meteor.startup(function(){
	Meteor.Auth = {
		github  : {
			basic : {
				type: "basic",
				username: "oogre",
				password: "223a7fcd17"
			},
			token : {
				type: "oauth",
				token: "4f7e3ca431dd79357a7d8e00e0b571e3cf9f78ef"
			}
		},
		tumblr : {
			consumer_key: "ZRpcBSqjGiQEgRhFWOSpwPr3uobxaNaubIkCq6vCyQHEKybnpw",
			consumer_secret: "K7ETeOZQDEiiomYWZpXjueC8DcdYPwmNiqZAE43J6MTmE7k48E",
			//token: 'OAuth Access Token',
			//token_secret: 'OAuth Access Token Secret'
		}
	};
});

})();
