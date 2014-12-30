//header template

//return username that has logged in
Template.header.helpers({
    username : function() {
        console.log(Meteor.user());
        return Meteor.user().username;
    }
});