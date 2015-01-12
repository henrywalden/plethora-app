//dropdown events

//search Session
Template.dropDownCreate.created = function() {
    return Session.set('queryParams', null);
};


//create new boards for user
Template.dropDownCreate.events({
    'submit #dropdown-create-board': function(e) {
        e.preventDefault();
        var createBoard = $(e.currentTarget),
            title = createBoard.find('#boardNewTitle').val(),
            //searchApi = createBoard.find('#boardNewSearch').val(),

            //to check for blank form fields
            error = validateBoard(title);

        //display error if user enter empty field
        if(error) {
            return throwError(error.msg);
        } else {
            //call boardInsert method to insert board title
            Meteor.call('boardsInsert', title, function(error, result) {
                //display error to user and abort
                if (error) {
                    return throwError(error.reason);
                }

                //route to boards page to display books
                Router.go('individualKanban', {_id: result._id});

                //to show search bar on individual board route
                $('.userSearch').removeClass('none');

                //attempt to call searchInsert
                //Meteor.call('searchesInsert', boardFields.searchApi, function(error, result) {
                //    console.log('searches Insert');
                //    Session.set('queryParams', result.query);
                //    //display error to user and abort
                //    if (error) {
                //        return throwError(error.reason);
                //    }
                //
                //    Router.go('amazonSearchPage', {_id: result._id}, {query: 'q='+result.query});
                //});



            });
        }


    }
});
