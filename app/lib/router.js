//global router config
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){Meteor.subscribe('notifications');}
});


//splash page routing
Router.route('/', {
    layoutTemplate: 'splash',
    name: 'home'
});

//reset password - send email route
Router.route('/reset', {
    layoutTemplate: 'Reset',
    notFoundTemplate: 'notFound',
    name: 'ForgotPassword'
});

//reset password page route
Router.route('/reset-password', {
    layoutTemplate: 'Reset',
    notFoundTemplate: 'notFound',
    name: 'ResetPassword'
});


Router.route('/welcome/', {
    name: 'kanban'
});


//dynamic route to individual kanban according to id
Router.route('/board/:_id', {
    name: 'individualKanban',

    //@todo add cards and event (indiv events)
    //waitOn: function() {
    //    return [Meteor.subscribe('cards', this.params._id), Meteor.subscribe('events', this.params._id)];
    //},
    data: function() {
        return Boards.findOne(this.params._id);
    }
});