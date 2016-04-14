import { Template } from 'meteor/templating';
 
import { Meteor } from 'meteor/meteor';
import { Posts } from '../api/posts.js';
import { Users } from '../api/users.js';
import './postCreate.js';
import './commentCreate.js';
import './blog.html';


var Blog = {
  getPosts: function(id, parentId, order) {
    return Posts.find({
      userId:  id,
      parentId: parentId
    }, {
      sort: {
        createdAt: order
      }
    });
  },
  getComments: function(id) {
    return this.getPosts({ $ne: null }, id, 1);
  },
  commentHelpers: { 
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
    comments: function() {
      return Blog.getComments(this._id);
    }
  }
}

Template.blog.helpers({
  posts: function() {
	  return Blog.getPosts(Session.get("currentUser"), { $exists: false }, -1);
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

Template.post.helpers(Blog.commentHelpers);
Template.comment.helpers(Blog.commentHelpers);
