"use strict";
/*global Meteor : false */
/*global Session : false */


Meteor.CONTENT				= "content";
Session.setDefault(Meteor.CONTENT, false);

Meteor.DIR					= "dirOpen";
Session.setDefault(Meteor.DIR, false);

Meteor.FILE					= "fileOpen";
Session.setDefault(Meteor.OPEN, false);

Meteor.FILE_CONTENT			= "fileContent";
Session.setDefault(Meteor.FILE_CONTENT, false);

Meteor.TUMBLR_POSTS			= "tumblrPost";
Session.setDefault(Meteor.TUMBLR_POSTS, false);

Meteor.TUMBLR_POSTS_LOADING	= "tumblrPostLoading";
Session.setDefault(Meteor.TUMBLR_POSTS_LOADING, false);
