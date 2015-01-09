//global router config
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){Meteor.subscribe('notifications');}
});


//splash page routing
Router.route('/', {
    name: 'home',
    controller: 'HomeController'
});

//splash page Controller
HomeController = RouteController.extend({
    layoutTemplate: 'splash'
});


//reset Controller
ResetController = RouteController.extend({
    layoutTemplate: 'Reset'
});

//reset password - send email route
Router.route('/reset', {
    controller: 'ResetController',
    name: 'ForgotPassword'
});

//reset password page route
Router.route('/reset-password', {
    controller: 'ResetController',
    name: 'ResetPassword'
});


Router.route('/welcome/', {
    name: 'kanban'
});


//dynamic route to individual kanban according to id
Router.route('/board/:_id', {
    name: 'individualKanban',
    waitOn: function() { Meteor.subscribe('boards'); },
    //@todo add cards and event (indiv events)
    //waitOn: function() {
    //    return [Meteor.subscribe('cards', this.params._id), Meteor.subscribe('events', this.params._id)];
    //},
    data: function() {
        return Boards.findOne(this.params._id);
    }
});

//amazon Search page
Router.route('/search/:_id?', {
    name: 'amazonSearchPage'
    //data: function() {
    //    return [Books.findOne(this.params._id), Books.findOne(this.params.query)];
    //}
});