//display individual kanban boards
Template.kanban.helpers({
    boards: function() {
        return Boards.find({userId: Meteor.userId()});
    }
});

//on click of any board show search bar
Template.kanban.events({
    'click #kanban-main ul': function() {
        return $('.userSearch').removeClass('none');
    }
});
