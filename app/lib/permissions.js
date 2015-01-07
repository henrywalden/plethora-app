//user owns document
ownsDocument = function(userId, doc){
    return doc && doc.userId === userId;
};
