import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
 
import { Posts } from '../api/posts.js';
import './commentCreate.html';

Template.createComment.onCreated(function () {
  this.display = new ReactiveVar(false);
});
Template.createComment.events({
  'submit .new-comment': function(event) {
    event.preventDefault();
    const target = event.target;
    const body = target.Body.value;
    const self = this;
    var error = false;
    var errors = {
      bodyBlank: body.length < 1,
      notLoggedIn: !Meteor.userId() 
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
    $("#createCommentError").css("display", style);
    console.log(self.parentId);
    if (!error) {
      Posts.insert({
        userId: Meteor.userId(),
        parentId: self.parentId,
        body: body,
        createdAt: new Date()
      });
      instance.display.set(false);
      target.reset();
    }
  },
  "click .comment": function () {
    const instance = Template.instance();
    const display = instance.display.get()
    console.log(display)
    instance.display.set(!display);
   }
});
Template.createComment.helpers({
  displayComment: function() {
    return Template.instance().display.get();
  }
});
