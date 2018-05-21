import {AbstractApplication} from './AbstractApplication';

class DesktopApplication extends AbstractApplication {
    updateContent(): Promise<boolean> {
        console.log('DesktopApp is updating.');
        return new Promise<boolean>((resolve, reject) => {
            setTimeout(function() {
                resolve(true);
            }, 2500);
        });
    }
}

export { DesktopApplication };