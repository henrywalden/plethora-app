//user's searches

Searches = new Mongo.Collection('searches');

Meteor.methods({
    searchesInsert: function (search){
        check(this.userId, String);
        check(search,  String);


        //@todo add repetitive search functionality to search within Search collection and show previous searches

        var searches = {
            userId : Meteor.userId(),
            searchArray : [search]
        };

        var searchId = Searches.insert(searches);


        return {
            _id : searchId,
            query: search
        }

    }
});

