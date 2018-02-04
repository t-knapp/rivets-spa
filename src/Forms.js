import $ from 'jquery';

var Forms = (function($) {

    var getInputValue = function(jQElement, inputName) {
        return jQElement.find("input[name='" + inputName + "']").val();
    };

    var getTitleValue = function(jQElement) {
        return getInputValue(jQElement, 'title');
    };

    var getTextValue = function(jQElement) {
        return getInputValue(jQElement, 'text');
    };

    var clearInputValues = function(jQElement) {
        jQElement.find("input[name]").val('');
    };

    var isInputValid = function(jQElement) {
        var titleValue = getTitleValue(jQElement);
        var textValue = getTextValue(jQElement);
        return titleValue && textValue && titleValue !== '' && textValue !== '';
    };

    return {
        isInputValid: isInputValid,
        clearInputValues: clearInputValues,
        getTextValue: getTextValue,
        getTitleValue: getTitleValue
    }

})($)

export default Forms;