


Template.amazonSearchPage.helpers({
    searchResults : function() {
        var search = Session.get('queryparams'),
        xmlhttp = new XMLHttpRequest(),
        nowDate =  new Date(),

        results = xmlhttp.open(
        "GET",
        "http://webservices.amazon.com/onca/xml?" +
        "Service=AWSECommerceService" +
        "&Operation=ItemSearch" +
        "&ResponseGroup=Small" +
        "&SearchIndex=All" +
        "&Keywords=" + search +
        "&AWSAccessKeyId= AKIAII5PQ2QF6IBKLSKA"+
        "&AssociateTag= glieseio-20" +
        "&Timestamp= " + nowDate +
        "&Signature= ACon3q46cAsXQ+VuIiqu0yaPnI773KF0prTITOJQ",
        true);

        xmlhttp.send();

        return results

    }
});
