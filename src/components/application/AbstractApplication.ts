abstract class AbstractApplication {

    abstract updateContent(): Promise<boolean>;

    getPath(): string {
        return "./assets/version/www/";
    }
}

export { AbstractApplication };