//user's searches

Books = new Mongo.Collection('books');


//Meteor.methods({
//    searchesInsert: function (search){
//        check(this.userId, String);
//
//
//        var searches = {
//            userId : Meteor.userId(),
//            userSearch : search
//        };
//
//        var searchId = Searches.insert(searches);
//
//
//        return {
//            _id : searchId,
//            query: search
//        }
//
//    }
//});

