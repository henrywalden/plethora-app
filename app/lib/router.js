//splash page routing
Router.route('/', {
    layoutTemplate: 'splash',
    name: 'home'
});

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function(){Meteor.subscribe('notifications');}
});


//todo route to board with username on signin/login
Router.route('/welcome/', {
    name: 'kanban'
});