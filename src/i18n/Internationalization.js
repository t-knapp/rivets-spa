export default class Internationalization {
    constructor() {
        this.languageMapping = {
            'de': 'de',
            'en': 'en'
        }
        this.defaultLanguage = 'en';
    }

    navigatorLanguage() {
        return navigator.language;
    }

    translateLanguage(navigatorLang) {
        for(var key in this.languageMapping) {
            if(navigatorLang.indexOf(key) !== -1)
                return this.languageMapping[key];
        }
        return this.defaultLanguage;
    }

    load() {
        const currentLang = this.translateLanguage(this.navigatorLanguage());
        const filename = './lang/lang.' + currentLang + '.js';
        return new Promise((resolve, reject) => {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.onerror = reject;
            script.onload = resolve;
            script.src = filename;
            document.head.append(script);
        });
    }
}