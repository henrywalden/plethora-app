Boards = new Mongo.Collection('boards');

Meteor.methods({
    boardsInsert: function(fields) {
        //audit augment package
        check(this.userId, String);
        check(fields , String);



        if (!fields) {
            console.log("error level 3");
            throw new Meteor.Error('invalid-field', 'Add non empty field');
        }

        var board = {
            boardName: fields,
            userId: Meteor.userId(),
            books: [],
            created: new Date()
        };

        //insert to Boards collection
        var boardId = Boards.insert(board);

        console.log(boardId);
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

        //if fieldnames return is more than 0, user is trying to edit fields more than just title (since they are removed with _.without)
        return (_.without(fieldNames, 'title').length > 0);
    }
});

validateBoard = function(errors) {
    var error = {};
    if (!errors) {
        error.msg = "Please enter a non empty field";
        return error;
    }
};