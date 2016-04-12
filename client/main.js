import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/ui/userlist.js';
import '../imports/ui/blog.js';

Template.body.onCreated(function() {
  Session.set("currentUser", null);
});
Template.body.helpers({
  validUser: function() {
    return Session.get("currentUser") !== null;
  }
});
