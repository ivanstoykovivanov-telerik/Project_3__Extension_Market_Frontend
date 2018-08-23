import { User } from "./user.model";
import { Tag } from "./tag.model";

export class Product{
    
    constructor(
        public name : string, 
        public description: string, 
        public version: string, 
        public owner: User, 
        public numberOfDownloads: number, 
        public downloadLink: string, 
        public sourceRepositoryLink: string, 
        public openIssues: number, 
        public tags: Tag[], 
        public pullRequests: number, 
        public lastCommitDate : Date,
        public productState: string,     //TODO: type? 
        public id? : number
    ){
    }
}