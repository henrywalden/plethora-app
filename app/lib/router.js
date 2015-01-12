//global router config
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    subscriptions: function(){Meteor.subscribe('notifications');}
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
    name: 'kanban',
    subscriptions : function() { Meteor.subscribe('boards')}
});


//dynamic route to individual kanban according to id
Router.route('/board/:_id', {
    name: 'individualKanban',
    //waitOn: function() {
    //    return [Meteor.subscribe('cards', this.params._id), Meteor.subscribe('events', this.params._id)];
    //},

    subscriptions: function() {
        return Meteor.subscribe('singleBoard', this.params._id);
    },
    data: function() {
        return Boards.findOne(this.params._id);
    }
});

//amazon Search page
Router.route('/search/:_id?', {
    name: 'googleSearchPage'
    //data: function() {
    //    return [Books.findOne(this.params._id), Books.findOne(this.params.query)];
    //}
});