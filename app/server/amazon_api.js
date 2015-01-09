


Meteor.methods({
    amazonSearch : function() {
        var search = Session.get('queryparams'),
            xmlhttp = new XMLHttpRequest(),
            nowDate = new Date(),

        results = xmlhttp.open(
            "GET",
            "http://webservices.amazon.com/onca/xml?" +
            "Service=AWSECommerceService" +
            "&Operation=ItemSearch" +
            "&ResponseGroup=Small" +
            "&SearchIndex=All" +
            "&Keywords=" + search +
            "&AWSAccessKeyId= AKIAII5PQ2QF6IBKLSKA" +
            "&AssociateTag= glieseio-20" +
            "&Timestamp= " + nowDate +
            "&Signature= ACon3q46cAsXQ+VuIiqu0yaPnI773KF0prTITOJQ",
            true);


        results = "http://webservices.amazon.com/onca/xml?" +
        "AWSAccessKeyId=AKIAII5PQ2QF6IBKLSKA" +
        "&AssociateTag=glieseio-20" +
        "&Condition=All" +
        "&Keywords=Italian%20Romantic%20Poetry" +
        "&Operation=ItemSearch" +
        "&ResponseGroup=Images" +
        "&SearchIndex=Books" +
        "&Service=AWSECommerceService" +
        "&Timestamp=2015-01-08T07%3A56%3A54.000Z" +
        "&Version=2011-08-01" +
        "&Signature=BZXrw6uloRYC5WtpFkTsb%2Ft850UjvEOJ6h%2FXBdmpl4Y%3D";

        xmlhttp.send();

        return results
    }
});
