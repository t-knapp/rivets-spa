import PouchDB from 'pouchdb';

var Database = (function(PouchDB) {

    var db = undefined;
    var init = function() {
        db = new PouchDB('rivets-spa');
    };

    var getItems = function() {
        return db.allDocs({include_docs: true})
        .then(allDocs => {
            var i, length = allDocs.rows.length, items = [];
            for(i = 0; i < length; i++) {
                items.push(allDocs.rows[i].doc);
            }
            return items;
        });
    };

    var addItem = function(item) {
        return db.put(item);
    };

    var deleteItem = function(docId) {
        return db.get(docId)
        .then(function (doc) {
            return db.remove(doc._id, doc._rev);
        });
    };

    init();

    return {
        getItems: getItems,
        addItem: addItem,
        deleteItem: deleteItem
    }

})(PouchDB);

export default Database;