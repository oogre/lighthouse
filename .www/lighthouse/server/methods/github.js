"use strict";

/*global Npm : false */
/*global HTTP : false */
/*global Async : false */
/*global Meteor : false */

var github;
var tumblr;

var initGithub = function(){
	var GitHub = Meteor.npmRequire("github");	

	var github = new GitHub({
		version: "3.0.0",
		timeout: 5000,
	});

	github.authenticate(Meteor.Auth.github.token);
	return github;
};
 
var initTumblur = function(){
	var tumblr = Meteor.npmRequire("tumblr");
	var blog = new tumblr.Blog("viceetversa.tumblr.com", Meteor.Auth.tumblr);
	return blog;
};

Meteor.methods({
	repocontent : function(path){
		github = github || initGithub();
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
	branches : function(){
		github = github || initGithub();
		return Async.runSync(function(done){
			github.repos.getBranches({
				user:"oogre",
				repo:"lighthouse",
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
	},
	rateLimit : function(){
		github = github || initGithub();
		return Async.runSync(function(done){
			github.misc.rateLimit({},function(err,data){
				done(null,data) ;
			}); 
		});
	},
	tumblr : function(offset){
		tumblr = tumblr || initTumblur();
		return Async.runSync(function(done){
			tumblr.posts({
				limit: 2, 
				offset: (offset||0)
			}, function(error, response) {
			  if (error) {
			    throw new Error(error);
			  }
			  done(null,response.posts);
			});
		});
	},
	tumblrInfo : function(){
		tumblr = tumblr || initTumblur();
		return Async.runSync(function(done){
			tumblr.info(function(error, response) {
			  if (error) {
			    throw new Error(error);
			  }
			  done(null,response);
			});
		});
	}
	/**/
});