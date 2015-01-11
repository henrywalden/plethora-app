Search = new Mongo.Collection('search');

Meteor.methods({
    searchesInsert: function (search){
        check(this.userId, String);


        var searches = {
            userId : Meteor.userId(),
            userSearch : search
        };

        var searchId = Search.insert(searches);


        return {
            _id : searchId,
            query: search
        }

    }
});

