//kanban board fixtures

if (Boards.find().count() === 0) {

    // create two users
    var henry = Meteor.users.insert({
        profile: {
            username: 'HenryQ',
            password: "henry12"
        }
    }),
    henryId = Meteor.users.findOne(henry),
    now = new Date().getTime();

    Boards.insert({
        userId: henryId._id,
        boardName: "Hello World",
        cards: [],
        created: new Date(now - 7 * 3600 * 1000)
    });

    Boards.insert({
        userId: henryId._id,
        boardName: "HrldWorELo",
        cards: [],
        created: new Date(now - 5 * 3600 * 1000)
    });

    Boards.insert({
        userId: henryId._id,
        boardName: "HolWdeolrld",
        cards: [],
        created: new Date(now - 3 * 3600 * 1000)
    });

    //create ten more boards
    for(var i= 0; i< 10; i++) {
        Boards.insert({
            userId: henryId._id,
            boardName: 'Test post #' + i,
            cards: [],
            created: new Date()
        });
    }
}