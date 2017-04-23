export class UserProfile{
    constructor(
        public userID: string,
        public firstName: string,
        public lastName: string,
        public numberOfLogins: string,
        public lastLogin: string,
        public userImageUrl: string,
        public email: string,
        public gender: string,
        public isEmailVerified: boolean,
        public age: string
    ){

   }
}