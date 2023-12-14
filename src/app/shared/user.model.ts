export class User {
    constructor(
        public email: string,
        public id: string,
        public expiryDate: Date,
        private _token: string,
    ) {}

    get token() {
        if(!this._token || this.expiryDate > new Date()) {
            return null
        }
        return this._token
    }
}