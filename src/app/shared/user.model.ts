export class User {
    constructor(
        private idToken: string,
        private email: string,
        private refreshToken: string,
        private expiresIn: string,
        private localId: string,
    ) {}
}