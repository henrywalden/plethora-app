//forgot password
Template.ForgotPassword.created = function(){
    Session.set('resetErrors', {});
};

Template.ForgotPassword.helpers({
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
//            console.log(errors.email);
            return Session.set('resetErrors', errors);
        }

        if (isNotEmpty(email) && isEmail(email)) {
            Accounts.forgotPassword({email: email}, function(err) {
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
            });

        }
        return false;
    }
});

if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
    Router.go('/reset-password')
}

Template.ResetPassword.helpers({
    resetPassword: function(){
        return Session.get('resetPassword');
    }
});

Template.ResetPassword.events({
    'submit #resetPasswordForm': function(e, t) {
        e.preventDefault();

        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            verify = resetPasswordForm.find('#resetPasswordPasswordConfirm').val(), 
            errors = {},
            resetFields = {
                password: password,
                verify: verify
            };

        errors =  validate(resetFields);
        //check for empty field
        if(errors) {
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