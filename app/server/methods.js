/* configuration of server side packages */

//validation of post within the post object to return missing title or url field
validate = function(loginFields){
    var errors = {};
    if(!loginFields.name){
        errors.title = "Please fill in a name";
    }
    if(!loginFields.email) {
        errors.url = "Please fill in your email"
    }
    if(!loginFields.password) {
        errors.url = "Please fill in a password 6 characters or more"
    }
    if(!loginFields.verify) {
        errors.url = "Please verify your password"
    }

    return errors;
};