import styles from './main.css';

import rivets from 'rivets';
import $ from 'jquery';
import randomstring from 'randomstring';

var Application = (function(rivets, $, randomstring) {

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
            add: function(event, boundModel) {
                boundModel.model.items.push({title: 'Title', text: randomstring.generate()})
            }
        },
        removeClass: 'hide'
    }

    var disable = function() {
        model.inizialized = false;
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