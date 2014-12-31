//forgot password
Template.ForgotPassword.created = function(){
    Session.set('resetErrors', {});
    Session.set('loadingSpinner', false)
};

Template.ForgotPassword.helpers({
    loadingSpinner: function(spinner){
        return Session.get('loadingSpinner')[spinner];
    },
    errorMessage : function(field) {
        return Session.get('resetErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('resetErrors')[field] ? 'has-error' : '';
    }
});

Template.ForgotPassword.events({
    'submit #forgotPasswordForm': function(e, t) {
        e.preventDefault();

        var forgotPasswordForm = $(e.currentTarget),
            email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase()),
            errors = {};

        if (!isNotEmpty(email) || !isEmail(email)) {
            errors.email = "Please enter a valid email";
            return Session.set('resetErrors', errors);
        }

        if (isNotEmpty(email) && isEmail(email)) {
            Accounts.forgotPassword({email: email}, function(err) {
                Session.set('loadingSpinner', true);
                if (err) {
                    if (err.message === 'User not found [403]') {
                        errors.email = err.message;
                        console.log(err.message);
                        console.log('This email does not exist.');
                        return Session.set('resetErrors', errors);

                    } else {
                        errors.email = "We are sorry but something went wrong.";
                        console.log('We are sorry but something went wrong.');
                        return Session.set('resetErrors', errors);
                    }
                } else {

                    return throwError('Email Sent. Check your mailbox.');
                }

                Session.set('loadingSpinner', false);
            });

        }
        return false;
    }
});

if (Accounts._resetPasswordToken) {
    console.log("Session is set");
    Session.set('resetPassword', Accounts._resetPasswordToken);
    Router.go('/reset-password');
}


Template.ResetPassword.created = function(){
    Session.set('resetErrors', {});
};


Template.ResetPassword.helpers({
    resetPassword: function(){
        return Session.get('resetPassword');
    },
    errorMessage : function(field) {
        return Session.get('resetErrors')[field];
    },
    errorClass: function(field) {
        return !!Session.get('resetErrors')[field] ? 'has-error' : '';
    }
});

Template.ResetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            verify = resetPasswordForm.find('#resetPasswordPasswordConfirm').val(), 
            errors = {};


        //check for empty field
        if(!isNotEmpty(password)) {
            errors.password = "Your password should be 6 characters or longer";
            return Session.set('resetErrors', errors);
        }

        //check matching passwords
        if(!areValidPasswords(password, verify)) {
            errors.password, errors.verify = "Your two passwords are not equivalent";
            return Session.set('resetErrors', errors);
        }


        if (isNotEmpty(password) && areValidPasswords(password, verify)) {
            Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
                if (err) {
                    errors.password = err.message;
                    errors.verify = err.message;
                    console.log('We are sorry but something went wrong.');
                    return Session.set('resetErrors', errors);
                } else {
                    Router.go('/welcome');
                    console.log('Your password has been changed. Welcome back!');
                    Session.set('resetPassword', null);
                    Session.set('resetErrors', {});
                }
            });
        }
        return false;
    }
});