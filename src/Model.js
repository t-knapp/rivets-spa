import Database from "./Database";

var Model = (function(Database){
    
    const defultView = 'list';

    var setView = function(view) {
        Model.currentView = view;
    };

    var disable = function() {
        Model.initialized = false;
    };

    return {
        initialized: true,
        currentView: defultView,
        setView: setView,
        disable: disable,
        removeClass: 'hide'
    }

})(Database);

export default Model;