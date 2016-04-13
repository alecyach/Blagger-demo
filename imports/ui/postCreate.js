import { Template } from 'meteor/templating';
 
import { Posts } from '../api/posts.js';
import './postCreate.html';

Template.createPost.events({
  'submit .new-post': function(event) {
    event.preventDefault();
    const target = event.target;
    const title = target.Title.value;
    const body = target.Body.value;
    var error = false;
    var errors = {
      titleBlank: title.length < 1,
      bodyBlank: body.length < 1
    };
    for (e in errors) {
      var fieldStyle = "none";
      if (errors[e]) {
        error = true;
        fieldStyle = "inline";
      }
      $("#" + e).css("display", fieldStyle);
    }
    var style = error ? "inline" : "none";
    $("#createPostError").css("display", style);
    if (!error) {
      Posts.insert({
        userId: Session.get("currentUser"),
        title: title,
        body: body,
        createdAt: new Date()
      });
      target.reset();
    }
  }
});
