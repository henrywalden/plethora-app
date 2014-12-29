//within our Errors collection finds all errors and adds to our errors template
Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});

//clear out the displayed(rendered) error message
Template.error.rendered = function () {
    var error = this.data;
    Meteor.setTimeout(function(){
        Errors.remove(error._id);
    }, 3000);
};