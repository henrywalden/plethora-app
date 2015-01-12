/* meteor publish definitions */

//publish kanban board to user
Meteor.publish('boards', function(id) {
    //check(id,  String);
    return Boards.find({ userId: this.userId });
});

Meteor.publish('singleBoard', function(id) {
    check(id, String);
    return Boards.find(id);
});


//publish searches to user
Meteor.publish('booksSearch', function(query) {
    var self = this;

    try {
        var response = HTTP.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query
            }
        });

        _.each(response.data.items, function(item) {
            var doc = {
                thumb: item.volumeInfo.imageLinks.smallThumbnail,
                title: item.volumeInfo.title,
                link: item.volumeInfo.infoLink,
                snippet: item.searchInfo && item.searchInfo.textSnippet
            };

            self.added('books', Random.id(), doc);
        });

        self.ready();

    } catch(error) {
        throw new Meteor.Error('server timeout', error);
    }
});