import { Template } from 'meteor/templating';
 
import { Meteor } from 'meteor/meteor';
import { Posts } from '../api/posts.js';
import { Users } from '../api/users.js';
import './postCreate.js';
import './commentCreate.html';
import './blog.html';
 
Template.blog.helpers({
  posts: function() {
    console.log("Searching for " + Session.get("currentUser"))
	  return Posts.find({
      userId:  Session.get("currentUser")
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
  blogAuthorName: function () {
    var self = this;
	  var user = Users.findOne({
      _id:  Session.get("currentUser")
    }, {
      sort: {
        createdAt: -1
      }
    });
    return user && user.username;
  },
  ownBlog: function () {
    return Meteor.userId() == Session.get("currentUser");
  }
});
Template.post.helpers({
  postAuthorName: function () {
    var self = this;
	  var user = Users.findOne({
      _id:  self.userId
    }, {
      sort: {
        createdAt: -1
      }
    });
    return user && user.username;
  },
  displayComment: function () {
    return Template.instance().display.get();
  }
});
Template.post.onCreated(function () {
  this.display = new ReactiveVar(false);
});
Template.post.events({
  "click .comment": function () {
    const instance = Template.instance();
    instance.display.set(true);
  }
});
