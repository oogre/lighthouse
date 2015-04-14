"use strict";
/*global _ : false */
/*global $ : false */
/*global Meteor : false */
/*global Template : false */
/*global Session : false */


var loadPost = function(){
	if(Session.equals(Meteor.TUMBLR_POSTS_LOADING, true)) return false;
	Session.set(Meteor.TUMBLR_POSTS_LOADING, true);
	var post = Session.get(Meteor.TUMBLR_POSTS) || {};
	var offset = _.keys(post).length;
	Meteor.call("tumblr", offset, function(e,r){
		var post = Session.get(Meteor.TUMBLR_POSTS) || {};
		post = _.extend(post, _.indexBy(r.result, "id"));
		Session.set(Meteor.TUMBLR_POSTS, post);
	});
	Session.set(Meteor.TUMBLR_POSTS_LOADING, false);
};
var maxPost = 0;
Template.tumblr.rendered = function(){
	Meteor.call("tumblrInfo", function(e,r){
		maxPost = r.result.blog.posts;
		if(maxPost > _.keys(Session.get(Meteor.TUMBLR_POSTS)).length){
			loadPost();	
		}
	});

	$(window).scroll(function(){
		if($(window).scrollTop() == $(document).height() - $(window).height()){
			if(maxPost > _.keys(Session.get(Meteor.TUMBLR_POSTS)).length){
				loadPost();	
			}
		}
	});
};

Template.tumblr.helpers({
	posts : function(){
		return _.values(Session.get(Meteor.TUMBLR_POSTS) || {});
	}
});

Template.tumblerPost.rendered = function(){
	$("video").each(function(){
		$(this).attr("controls", "controls").attr("loop", "loop")[0].play();
	});
	if($(window).scrollTop() == $(document).height() - $(window).height()){
		loadPost();
	}
};

Template.tumblerPost.helpers({
	isPhoto : function(){
		return this.type === "photo";
	},
	isVideo : function(){
		return this.type === "video";
	},
	isText : function(){
		return this.type === "text";
	},
	video : function(){
		return this.player[2].embed_code;
	}
});