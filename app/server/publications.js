/* meteor publish definitions */

//publish kanban board to user
Meteor.publish('boards', function(id) {
    //check(id,  String);
    return Boards.find({ userId: this.userId });
});


//publish searches to user
Meteor.publish('searches', function(id) {
    //check(id,  String);
    return Searches.find({ userId: this.userId });
});