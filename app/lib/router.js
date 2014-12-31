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