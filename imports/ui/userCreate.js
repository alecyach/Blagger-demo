import { Template } from 'meteor/templating';
 
import { Users } from '../api/users.js';
import './userCreate.html';

Template.createUser.events({
  'submit .new-user': function(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.Username.value;
    const email = target.Email.value;
    const password = target.Password.value;
    const confirmPassword = target.ConfirmPassword.value;
    var error = false;
    var errors = {
      userBlank: username.length < 1,
      userAlreadyExists: Users.find({username: username}).count() > 0,
      missingEmail: email.length < 3,
      passwordMismatch: password != confirmPassword,
      passwordTooShort: password.length < 5
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
    $("#createUserError").css("display", style);
    if (!error) {
      Users.insert({
        username: username,
        email: email,
        password: password,
        createdAt: new Date()
      });
      target.reset();
    }
  }
});
