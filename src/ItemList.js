import randomstring from 'randomstring';

import Model from "./Model";
import Database from "./Database";

var ItemList = (function(Model, Database, randomstring){

    var loadItems = function() {
        Database.getItems()
        .then(items => {
            Model.list.items = items;
        });
    };

    var remove = function(event) {
        var id = event.target.getAttribute('data-id');
        deleteItem(id);
    }

    var addItem = function() {
        Model.list.addPossible = false;
        var newItem = {
            _id: randomstring.generate(),
            entityType: 'Item',
            title: 'Title',
            text: randomstring.generate()
        };
        Database.addItem(newItem)
        .then(result => {
            Model.list.items.push(newItem);
            Model.list.addPossible = true;
        }).catch(e => {
            console.warn('e', e);
            Model.list.addPossible = true;
        })
    };

    var deleteItem = function(docId) {
        Database.deleteItem(docId)
        .then(function() {
            removeItemFromModel(docId);
        });
    };

    var removeItemFromModel = function(docId) {
        var i;
        var found = false;
        for(i = 0; i < Model.list.items.length && !found; i++) {
            if(Model.list.items[i]._id === docId) {
                found = true;
                Model.list.items.splice(i, 1);
            }
        }
    };

    Model.list = {
        items: undefined,
        addPossible: true,
        remove: remove,
        add: addItem
    }

    // Init
    loadItems();

})(Model, Database, randomstring);

export default ItemList;