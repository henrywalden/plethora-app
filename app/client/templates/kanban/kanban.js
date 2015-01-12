//display individual kanban boards
Template.kanban.helpers({
    boards: function() {
        return Boards.find({userId: Meteor.userId()});
    },

    //if no new boards exist, display message(true) else false
    newBoards: function() {
        if(Boards.find().count() === 0) {
            return true
        }
        return false;
    }
});

//on click of any board show search bar
Template.kanban.events({
    'click #kanban-main ul': function() {
        return $('.userSearch').removeClass('none');
    }
});
