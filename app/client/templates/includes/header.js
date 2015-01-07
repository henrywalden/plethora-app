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
    }
});

//on click of create new board, I want to add to the Boards collection the user's board!
Template.header.events({
    'click .dropdown-toggle': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();


        Session.set('showPopBoard', true);
    },

    'submit #create-board': function(e, tmpl) {
        e.preventDefault();

        var createBoard = $(e.currentTarget),
            title = trimInput(createBoard.find('#boardNewTitle').val()),
            error = validateBoard(title);


        //display error if user enter empty field
        if(error) {
            return throwError(error.title);
        }

        Meteor.call('boardsInsert', title);
    },

    //on click of X button, set Session to null to prevent display
    'click .close-btn': function () {
        Session.set('showPopBoard', false);
        Session.set('showPopUser', false);
        Session.set('showPopNotifications', false)
    }
});