"use strict";

/*global Npm : false */
/*global HTTP : false */
/*global Async : false */
/*global Meteor : false */

var GitHub = Meteor.npmRequire("github");
 
var github = new GitHub({
	version: "3.0.0",
	timeout: 5000,
});

github.authenticate(Meteor.githubAuth);

Meteor.methods({
	repocontent : function(path){
		return Async.runSync(function(done){
			github.repos.getContent({
				user:"oogre",
				repo:"lighthouse",
				path: (!path||path)==="root" ? "" : path
			},function(err,data){
				done(null,data) ;
			}); 
		});
	},
	getFile : function(url){
		var Future = Npm.require("fibers/future");
		var myFuture = new Future();
		HTTP.get(url, function(err, data){
			if(err) myFuture.throw(err);
			if(data.statusCode != 200) myFuture.throw(new Meteor.Error("statusCode-"+data.statusCode));
				myFuture.return(data.content);		
		});
		return myFuture.wait();
	}
});