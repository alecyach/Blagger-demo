import { Template } from 'meteor/templating';
 
import { Users } from '../api/users.js';
import './userlist.html';

Template.user.events({
  'click': function(e, t) {
    var self = this;
    Session.set("currentUser", self._id);
    console.log(self._id);
  }
});
Template.userlist.helpers({
  users: function() {
	  return Users.find({});
  }
});
Template.user.helpers({
  formattedDate: function(date) {
    return date.toDateString();
  }
});
