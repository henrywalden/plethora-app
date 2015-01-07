//header template

//set Session for dropdowns
Template.header.created = function () {
    Session.set('showPopBoard', null);
    Session.set('showPopUser', null);
    Session.set('showPopNotifications', null);
};

//return username that has logged in
Template.header.helpers({
    username : function() {
        return Meteor.user().username;
    },
    showPopBoard : function() {
        return Session.get('showPopBoard');
    },
    showPopUser : function() {
        return Session.get('showPopUser');
    },
    showPopNotifications : function() {
        return Session.get('showPopNotifications');
    }
});

//header events
Template.header.events({
    //to show dropdown create
    'click #dropdown-create': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();
        Session.set('showPopBoard', true);
    },
    //to show dropdown user
    'click #dropdown-user': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();
        Session.set('showPopUser', true);
    },
    //to show dropdown user
    'click #dropdown-notifications': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();
        Session.set('showPopNotifications', true);
    },

    //on click of X button, set Session to null to prevent display
    'click .close-btn': function () {
        Session.set('showPopBoard', false);
        Session.set('showPopUser', false);
        Session.set('showPopNotifications', false)
    }
});


