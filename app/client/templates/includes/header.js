//header template

//return username that has logged in
Template.header.helpers({
    username : function() {
        return Meteor.user().username;
    }
});