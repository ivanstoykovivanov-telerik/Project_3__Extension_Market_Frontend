import { User } from "./user.model";
import { Tag } from "./tag.model";

export class Product{
    public id : number;
    public name : string; 
    public description : string; 
    public version : string;
    public owner : User;
    public numberOfDownloads : number;
    public downloadLink : string; 
    public sourceRepositoryLink : string; 
    public numberOfOpenIssues : number;
    public numberOfPullRequests : number;
    public lastCommitDate: Date;
    public tags: Tag[]; 
    
    
    constructor(name : string, description: string, version: string, owner: User, 
        numberOfDownloads: number, downloadLink: string, sourceRepositoryLink: string, 
        numberOfOpenIssues: number, tags: Tag[], 
        lastCommitDate : Date ){
        this.name = name; 
        this.description = description; 
        this.version = version;
        this.owner = owner;
        this.numberOfDownloads = numberOfDownloads;
        this.downloadLink = downloadLink; 
        this.sourceRepositoryLink =  sourceRepositoryLink; 
        this.numberOfOpenIssues = numberOfOpenIssues;
        this.numberOfPullRequests = numberOfOpenIssues;
        this.lastCommitDate = lastCommitDate;
        this.tags = tags; 
        this.lastCommitDate = lastCommitDate; 
    }
}