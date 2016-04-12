import { Template } from 'meteor/templating';
 
import { Posts } from '../api/posts.js';
import './blog.html';
 
Template.blog.helpers({
  posts() {
    console.log("Searching for " + Session.get("currentUser"))
	  return Posts.find({
      userId:  Session.get("currentUser")
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});
