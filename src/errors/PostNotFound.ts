export class PostNotFound extends Error {
    constructor() {
        super('PostNotFound');
        this.name = 'PostNotFound';
    }
}