import randomstring from 'randomstring';

import $ from 'jquery';

import Model from "./Model";
import Database from "./Database";

var ItemList = (function(Model, Database, randomstring, $){

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

    var getInputValue = function(inputName) {
        return viewRoot.find("input[name='" + inputName + "']").val();
    };

    var getTitleValue = function() {
        return getInputValue('title');
    };

    var getTextValue = function() {
        return getInputValue('text');
    };

    var clearInputValues = function(inputName) {
        viewRoot.find("input[name]").val('');
    };

    var isInputValid = function() {
        var titleValue = getTitleValue();
        var textValue = getTextValue();
        return titleValue && textValue && titleValue !== '' && textValue !== '';
    };

    var addItem = function() {
        if(!isInputValid()) {
            console.log('Input is not valid.');
            return;
        }
        Model.list.addPossible = false;
        var titleValue = getTitleValue();
        var textValue = getTextValue();
        var newItem = {
            _id: randomstring.generate(),
            entityType: 'Item',
            title: titleValue,
            text: textValue
        };
        Database.addItem(newItem)
        .then(result => {
            Model.list.items.push(newItem);
            Model.list.addPossible = true;
            clearInputValues();
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

})(Model, Database, randomstring, $);

export default ItemList;