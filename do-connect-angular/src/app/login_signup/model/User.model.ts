/*
This file is used to create a User class with the following properties:
- id: number
- name: string
- _token: string
*/
export class User {
    constructor(
        public id: number,
        public name: string,
        private _token: string
    ){}

    get token() {
        return this._token;
    }

}