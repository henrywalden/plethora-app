
//receive Session
Tracker.autorun(function() {
    if (Session.get('queryParams')) {
        var searchHandle = Meteor.subscribe('booksSearch', Session.get('queryParams'));
        Session.set('searching', ! searchHandle.ready());
    }
});

//too books helper search our Searches Collection and return current user's only searches
Template.googleSearchPage.helpers({
    books:  function() {
        return Books.find();
    },

    searching: function() {
        return Session.get('searching')
    }
});




//searchResults: function() {
//    var userQuery = Session.get('queryParams');
//
//    Meteor.call('amazonSearch', userQuery, function(error,  result){
//        if(error) {
//            console.log("amazonSearch call error");
//            return throwError(error);
//        }
//
//        return result;
//
//    });
//},