let PlatformApp = (function() {
    
    const getPath = function() {
        return '<plug-in-call> chcp.getPath().wwwPath';
    }

    const platformAugmentation = function() {
        const currentPlatform = 'mobile';
        if(currentPlatform === 'desktop') {
            require('./desktop/PlatformApp');
        } else {
            require('./cordova/PlatformApp');
        }
    }

    return {
        getPath: getPath,
        platformAugmentation: platformAugmentation
    }

})();

export default PlatformApp;

PlatformApp.platformAugmentation();

