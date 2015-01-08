Boards = new Mongo.Collection('boards');

Meteor.methods({
    boardsInsert: function(fields) {
        //audit augment package
        check(this.userId, String);
        check(fields, {
            title : String,
            searchApi : String
        });

        if (!fields.title || !fields.searchApi) {
            throw new Meteor.Error('invalid-field', 'Add non empty field');
        }

        var board = {
            boardName: fields.title,
            userId: Meteor.userId(),
            cards: [],
            created: new Date()
        };

        //insert to Boards collection
        var boardId = Boards.insert(board);

        //return the _id to client
        return {
            _id: boardId
        };
    }
});

Boards.allow({
    update: function(userId, doc) { return ownsDocument(userId,  doc)},
    remove: function(userId, doc) { return ownsDocument(userId,  doc)}
});

Boards.deny({
    update: function(userId, doc, fieldNames) {

        //if fieldnames return is more than 0, user is trying to edit fields more than just title(since they are removed with _.without)
        return (_.without(fieldNames, 'title', 'searchApi').length > 0);
    }
});

validateBoard = function(errors) {
    var error = {};
    if (!errors.title || !errors.searchApi) {
        error.msg = "Please enter a non empty field";
        return error;
    }
};