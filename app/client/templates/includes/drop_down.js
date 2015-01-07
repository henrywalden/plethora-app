//dropdown events


//create new boards for user
Template.dropDownCreate.events({
    'submit #dropdown-create-board': function(e) {
        console.log('event works');
        e.preventDefault();
        var createBoard = $(e.currentTarget),
            title = createBoard.find('#boardNewTitle').val(),
            error = validateBoard(title);

        //display error if user enter empty field
        if(error) {
            return throwError(error.title);
        } else {
            Meteor.call('boardsInsert', title);
        }


    }
});
