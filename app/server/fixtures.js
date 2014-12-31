//kanban board fixtures

if (Boards.find().count() === 0) {
    // create two users
    var henry = Meteor.users.insert({
        profile: {username: 'HenryQ' }
    });
    var henryId = Meteor.users.findOne(henry);

    Boards.insert({
        userId: henryId._id,
        boardName: "Hello World"
    });

    Boards.insert({
        userId: henryId._id,
        boardName: "HrldWorELo"
    });

    Boards.insert({
        userId: henryId._id,
        boardName: "HolWdeolrld"
    });

    //create ten more boards
    for(var i= 0; i< 10; i++) {
        Boards.insert({
            userId: henryId._id,
            boardName: 'Test post #' + i
        });
    }
}