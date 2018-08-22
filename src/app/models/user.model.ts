export class User{
    
    public id : number;
    public username : string; 
    public password : string; 

    constructor(username : string, password ){
        this.username = username; 
        this.password = password; 
    }

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

