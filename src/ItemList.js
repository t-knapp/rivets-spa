import randomstring from 'randomstring';

import $ from 'jquery';
import moment from 'moment';

import Model from "./Model";
import Database from "./Database";
import Forms from './Forms';

var ItemList = (function(Model, Database, randomstring, $, moment, Forms){

    var viewRoot = $('#list');

    var loadItems = function() {
        Database.getItems()
        .then(items => {
            Model.list.items = items;
        });
    };

    var remove = function(event) {
        var id = event.target.getAttribute('data-id');
        deleteItem(id);
    };

    var addItem = function() {
        if(!Forms.isInputValid(viewRoot)) {
            console.log('Input is not valid.');
            return;
        }
        Model.list.addPossible = false;
        var titleValue = Forms.getTitleValue(viewRoot);
        var textValue = Forms.getTextValue(viewRoot);
        var newItem = {
            _id: randomstring.generate(),
            entityType: 'Item',
            title: titleValue,
            text: textValue,
            timeAdded: moment().format('LLLL'),
            timeModified: null
        };
        Database.addItem(newItem)
        .then(result => {
            Model.list.items.push(newItem);
            Model.list.addPossible = true;
            Forms.clearInputValues(viewRoot);
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

    var details = function(event) {
        var id = event.target.getAttribute('data-id');
        Model.setView('detail');
        Model.details.setDetails(id);
    };

    var updateItem = function(item) {
        var index = indexOfItem(item._id);
        if(index !== undefined) {
            Model.list.items[index]._rev = item._rev;
            Model.list.items[index].title = item.title;
            Model.list.items[index].text = item.text;
            Model.list.items[index].timeModified = item.textimeModified;
            Model.setView('list');
        }
    };

    var indexOfItem = function(docId) {
        var i, found = false, length = Model.list.items.length, index;
        for(i = 0; i < length && !found; i++) {
            if(Model.list.items[i]._id === docId) {
                found = true;
                index = i;
            }
        }
        return index;
    };

    Model.list = {
        items: undefined,
        addPossible: true,
        remove: remove,
        add: addItem,
        details: details,
        updateItem: updateItem
    }

    // Init
    loadItems();

})(Model, Database, randomstring, $, moment, Forms);

export default ItemList;