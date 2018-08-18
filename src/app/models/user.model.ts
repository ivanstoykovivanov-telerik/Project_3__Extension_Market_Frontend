export class User{
    
    public id : number;
    private _username : string; 
    public _password : string; 

    constructor(username : string, password ){
        this._username = username; 
        this._password = password; 
    }

    get username(): string {
        return this._username; 
    }

    set username(newUsername : string){
        this._username = newUsername ; 
    }

    set password(password: string){
        this._password = password; 
    }

    get password() :string {
        return this._password; 
    }
    
}

