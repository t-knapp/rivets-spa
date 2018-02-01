import styles from './main.css';

import PouchDB from 'pouchdb';
import rivets from 'rivets';
import $ from 'jquery';
import randomstring from 'randomstring';

var Application = (function(rivets, $, randomstring) {

    var pouchDB = new PouchDB('rivets-spa');
    var rootId = $('#main');
    var view = undefined;
    var model = {
        inizialized: true,
        currentView: 'list',
        setView: function(a) {
            setView(a);
        },
        disable: function(a, b, c) {
            disable();
        },
        list: {
            items: [],
            addPossible: true,
            add: function(event, boundModel) {
                //boundModel.model.items.push({title: 'Title', text: randomstring.generate()})
                addItem();
            },
            remove: function(event) {
                var id = event.target.getAttribute('data-id');
                deleteItem(id);
            }
        },
        removeClass: 'hide'
    }

    var disable = function() {
        model.inizialized = false;
    };

    var loadItems = function() {
        pouchDB.allDocs({include_docs: true})
        .then(allDocs => {
            var i, length = allDocs.rows.length;
            for(i = 0; i < length; i++) {
                model.list.items.push(allDocs.rows[i].doc);
            }
        });
    };

    loadItems();

    var addItem = function() {
        model.list.addPossible = false;
        var newItem = {
            _id: randomstring.generate(),
            entityType: 'Item',
            title: 'Title',
            text: randomstring.generate()
        };
        pouchDB.put(newItem)
        .then(result => {
            model.list.items.push(newItem);
            model.list.addPossible = true;
        }).catch(e => {
            console.warn('e', e);
            model.list.addPossible = true;
        })
    };

    var deleteItem = function(docId) {
        pouchDB.get(docId)
        .then(function (doc) {
            return pouchDB.remove(doc._id, doc._rev);
        })
        .then(function(result) {
            var i;
            var found = false;
            for(i = 0; i < model.list.items.length && !found; i++) {
                if(model.list.items[i]._id === docId) {
                    found = true;
                    model.list.items.splice(i, 1);
                }
            }
        });
    };

    rivets.configure({
        // extracted from: https://github.com/mikeric/rivets/issues/258#issuecomment-52489864
        // This configuration allows for on- handlers to receive arguments
        // so that you can onclick="steps.go" data-on-click="share"
        handler: function (target, event, binding) {
            var eventType = binding.args[0];
            var arg = target.getAttribute('data-on-' + eventType);
    
            if (arg) {
                this.call(binding.model, arg);
            } else {
                // that's rivets' default behavior afaik
                this.call(binding.model, event, binding);
            }
        }
    });

    rivets.binders['removeclass-*'] = function(el, value) {
        var className = this.args[0];
        if(className) {
            if(value === true)
                $(el).removeClass(className);
            if(value === false)
                $(el).addClass(className);
        }
    }

    rivets.binders['addclass-*'] = function(el, value) {
        var className = this.args[0];
        if(className) {
            if(value === true)
                $(el).addClass(className);
            if(value === false)
                $(el).removeClass(className);
        }
    }

    rivets.formatters.eq = function (value, args) {
        return value === args;
    };

    rivets.formatters.length = function(value) {
        return value.length;
    };

    var setView = function(view) {
        model.currentView = view;
    };

    var bind = function() {
        if(!view){
            view = rivets.bind(rootId, model);
        }
    }

    bind();

})(rivets, $, randomstring);