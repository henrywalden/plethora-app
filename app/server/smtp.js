/*email reset*/
Meteor.startup(function () {
    var smtp = process.env;

    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.USERNAME) + ':' + encodeURIComponent(smtp.PASSWORD) + '@' + encodeURIComponent(smtp.SERVER) + ':' + smtp.PORT;

});