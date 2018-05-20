import styles from './style/main.css';

import rivets from 'rivets';
import $ from 'jquery';

import Internationalization from './i18n/Internationalization';

import Model from './Model';
import ItemList from './ItemList';
import Details from './Details';

var Application = (function(rivets, $, Model, ItemList, Details) {

    var rootId = $('#main');
    var rivetsView = undefined;

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
        if(value)
            return value.length;
    };

    var bindRivets = function() {
        if(!rivetsView){
            rivetsView = rivets.bind(rootId, Model);
        }
    };

    //bindRivets();

    var sync = function() {
        rivetsView.sync();
    };

    return {
        sync: sync,
        bindRivets: bindRivets
    }

})(rivets, $, Model, ItemList, Details);

export default Application;

const i18n = new Internationalization();
i18n.load()
.then(() => { Application.bindRivets(); })
.catch(() => { console.warn("Error loading language."); });