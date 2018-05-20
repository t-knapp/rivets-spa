import './style/General.less';
import './style/App.css';

console.log("Hallo App");

setTimeout(() => {
    console.log('Delayed Arrow.')
}, 1000);

export default class App {
    constructor() {
        console.log("Say Hallo");
    }
}

const app = new App();