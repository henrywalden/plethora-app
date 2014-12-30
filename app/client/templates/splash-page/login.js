//login form error Session
Template.loginForm.created = function(){
    Session.set('loginErrors', {});
};

//using our template. set the error message
Template.loginForm.helpers({
    errorMessage : function(field) {
        return Session.get('loginErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('loginErrors')[field] ? 'has-error' : '';
    }
});

//sign up form event handler
Template.loginForm.events({
    'submit #login-form' : function(e){
        e.preventDefault();

        var loginForm = $(e.currentTarget),
            email = trimInput(loginForm.find('#email').val().toLowerCase()),
            password = loginForm.find('#password').val(),

        //to set out session errors
            loginFields = {
                email : email,
                password: password
            },

        //check for empty form fields
        errors = validate(loginFields);

        if(errors.email || errors.password){
            return Session.set('loginErrors', errors);
        }


        //if email and password fields are not empty, we will check within our accounts collection
        //for correct email and password match

        Meteor.loginWithPassword(email, password, function(err) {
            if (err) {
                errors.email = err.reason,
                errors.password = err.reason;
                return Session.set('loginErrors', errors);

            } else {
                //todo add router.go to user kanban board
                console.log('Welcome back Meteorite!');
                Router.go('/welcome');
                //refresh Session state
                return Session.set('loginErrors', {});
            }
        });


        //keeps complier happy?
        return false;
    }
});