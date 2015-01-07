Boards = new Mongo.Collection('boards');

Meteor.methods({
    boardsInsert: function(title) {
        //audit augment package
        check(title, String);


        var user = Meteor.user();

        if (!title) {
            throw new Meteor.Error('invalid-title', 'You must add a title');
        }

        board = {
            boardName: title,
            userId: user._id,
            cards: [],
            created: new Date()
        };

        Boards.insert(board);
    }
});

Boards.allow({
    update: function(userId, doc) { return ownsDocument(userId,  doc)},
    remove: function(userId, doc) { return ownsDocument(userId,  doc)}
});

Boards.deny({
    update: function(userId, doc, fieldNames) {

        //if fieldnames return is more than 0, user is trying to edit fields more than just title(since they are removed with _.without)
        return (_.without(fieldNames, 'title').length > 0);
    }
});

validateBoard = function(title) {
    var error = {};
    if(!title) {
        error.title = "Please enter a non empty title";
        return error;
    }
};