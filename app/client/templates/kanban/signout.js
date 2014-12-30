//signout event
Template.signOut.events({
    'click #signOut': function(e, t) {

        Meteor.logout(function() {

            setTimeout(Router.go('/'), 2000);
        });

        return false;
    }
});