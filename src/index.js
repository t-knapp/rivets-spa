import styles from './main.css';

import rivets from 'rivets';
import $ from 'jquery';
import randomstring from 'randomstring';

var Application = (function(rivets, $, randomstring) {

    var rootId = $('#main');
    var view = undefined;
    var model = {
        currentView: 'list',
        setView: function(a) {
            setView(a);
        },
        list: {
            items: [],
            add: function(event, boundModel) {
                boundModel.model.items.push({title: 'Title', text: randomstring.generate()})
            }
        }
    }

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

    rivets.formatters.eq = function (value, args) {
        return value === args;
    };

    rivets.formatters.length = function(value) {
        return value.length;
    };

    var setView = function(view) {
        console.log('setView', view)
        model.currentView = view;
    };

    var bind = function() {
        if(!view){
            view = rivets.bind(rootId, model);
        }
    }

    bind();

})(rivets, $, randomstring);