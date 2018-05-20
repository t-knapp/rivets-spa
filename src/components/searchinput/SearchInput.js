import rivets from 'rivets'
import $ from 'jquery'

import './SearchInput.less'

export default class SearchInput {
    constructor(domSelector) {
        this.domSelector = domSelector;
        this.model = {
            text: "Hallo",
            actions: {
                changeText: this.changeText.bind(this)
            }
        }
        this.view = undefined;
        this.isBound = false;
    }

    changeText() {
        this.model.text = lang.changeText;
    }

    bind() {
        if(!this.isBound) {
            this.view = rivets.bind($(this.domSelector), this.model);
        }
    }
}