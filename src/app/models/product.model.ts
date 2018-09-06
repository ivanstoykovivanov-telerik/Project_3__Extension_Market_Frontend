import { User } from "./user.model";
import { Tag } from "./tag.model";

export class Product{
    
    constructor(
        public name : string,               //
        public description: string,         // 
        public version: string,             //
        public ownerId: number, 
        // public owner: User, 
        // public downloadLink: string,        // 
        public sourceRepositoryLink: string,// 
        public fileId: number, 
        public tags: Tag[], 
        public numberOfDownloads?: number, 
        public openIssues?: number, 
        public pullRequests?: number, 
        public lastCommitDate? : Date,
        public productState?: string,     //TODO: type? 
        public id? : number, 
        public active? : boolean, 
    ){
    }
}