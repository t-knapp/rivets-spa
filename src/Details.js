import $ from "jquery";
import moment from "moment";

import Model from "./Model";
import Database from "./Database";
import Forms from "./Forms";

var Details = (function(Model, Database, $, Forms, moment) {

    var viewRoot = $('#detail');

    var setDetails = function(docId) {
        Database.getItem(docId)
        .then(dbItem => {
            Model.details.item = dbItem;
        })
        .catch(err => {
            console.log('Error on setDetails', err);
        });
    };

    var saveItem = function() {
        if(!Forms.isInputValid(viewRoot)) {
            console.log('Input is not valid.');
            return;
        }
        Model.details.item.title = Forms.getTitleValue(viewRoot);
        Model.details.item.text = Forms.getTextValue(viewRoot);
        Model.details.item.timeModified = moment().format('LLLL');
        Database.addItem(Model.details.item)
        .then(result => {
            if(result && result.ok === true) {
                Model.details.item._rev = result.rev;
                Model.list.updateItem(Model.details.item);
            }
        })
        .catch(err => {
            console.error('Cannot save item.', err);
        });
    };

    Model.details = {
        setDetails: setDetails,
        item: undefined,
        save: saveItem
    };

})(Model, Database, $, Forms, moment);

export default Details;