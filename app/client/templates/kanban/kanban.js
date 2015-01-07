//display individual kanban boards
Template.kanban.helpers({
    boards: function() {
        return Boards.find({userId: Meteor.user()._id});
    }
});
