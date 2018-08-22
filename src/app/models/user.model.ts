export class User{
   
    constructor(
        public username : string, 
        public password : string, 
        public firstName? : string, 
        public lastName? : string, 
        public email? : string, 
    ){ }

    // get username(): string {
    //     return this._username; 
    // }

    // set username(newUsername : string){
    //     this._username = newUsername ; 
    // }

    // set password(password: string){
    //     this._password = password; 
    // }

    // get password() :string {
    //     return this._password; 
    // }
    
}

