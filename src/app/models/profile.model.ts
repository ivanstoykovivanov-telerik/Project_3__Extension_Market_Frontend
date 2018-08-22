import { User } from "./user.model";

// DO I NEED ?? 
export class Profile extends User{
    
    public id : number;
    public username : string; 
    public password : string; 
    //other profile fields

    constructor(username : string, password: string ){
        super(username, password); 
    }
    
    
}
