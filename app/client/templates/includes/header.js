//header template

//set Session for dropdowns
Template.header.created = function () {
    Session.set('showPopBoard', null);
    Session.set('showPopUser', null);
    Session.set('showPopNotifications', null);

    //for queryParams on search bar
    Session.set('queryParams', null);
};

//return username that has logged in
Template.header.helpers({
    username : function() {
        return Meteor.user().username;
    },
    showPopBoard : function() {
        return Session.get('showPopBoard');
    },
    showPopUser : function() {
        return Session.get('showPopUser');
    },
    showPopNotifications : function() {
        return Session.get('showPopNotifications');
    }
});

//header events
Template.header.events({
    //show boards
    'click .header-btn': function() {
        Router.go('/welcome/');

        //hide search button on boards' page
        $('.userSearch').addClass('none');
    },

    //to show dropdown create
    'click #dropdown-create': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();
        Session.set('showPopBoard', true);
    },
    //to show dropdown user
    'click #dropdown-user': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();
        Session.set('showPopUser', true);
    },
    //to show dropdown user
    'click #dropdown-notifications': function(e, tmpl) {
        //e.stopPropagation();
        e.preventDefault();
        Session.set('showPopNotifications', true);
    },

    //on click of X button, set Session to null to prevent display
    'click .close-btn': function () {
        Session.set('showPopBoard', false);
        Session.set('showPopUser', false);
        Session.set('showPopNotifications', false)
    }

});


//search template events
Template.search.events({
    'submit #searchArea' : function (e) {
        e.preventDefault();

        var search = $(e.currentTarget),
            searchApi = search.find('#newSearch').val(),
            errors = validateBoard(searchApi);



        if(errors) {
            return throwError(errors.msg)
        } else {
            //I want to search the google api straight away
            //but I have add the boards insert as such, which involves
            //adding the board title and then the search functionality
            Session.set('queryParams', searchApi);


            //call search insert to insert search to search collection
            //if successful, route to template
            Meteor.call('searchesInsert', searchApi, function(error, result){
                if (error) {
                    return throwError(error.reason);
                }

                Router.go('googleSearchPage', {_id: result._id}, {query: 'q='+searchApi, hash: {}});
            });



        }



    }

});