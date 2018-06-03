//import PlatformApp from './../PlatformApp';
let PlatformApp = require('./../PlatformApp');

PlatformApp = PlatformApp.default;

(function() {
    
    const doStuff = function() {
        console.log('PlatformApp (Desktop) .doStuff()');
    }

    PlatformApp.hasCamera = true;
    PlatformApp.doStuff = doStuff;

})(PlatformApp)

export default PlatformApp;