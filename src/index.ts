import { add } from './components/calculator/Calculator';
import { DesktopApplication } from './components/application/DesktopApplication';

class Index {
    private message: string;

    constructor(message: string) {
        this.message = message;
    }

    start() {
        console.log('MSG:', this.message);
    }

    math(a: number, b: number) {
        return add(a, b);
    }
}

const idx = new Index("Hello Index");
idx.start();
console.log(idx.math(2,5));

const app = new DesktopApplication();
app.updateContent().then((result: boolean) => {
    console.log('Update gave:', result);
});
console.log('path', app.getPath());