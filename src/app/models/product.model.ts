import { Tag } from "./tag.model";

export class Product{
    
    constructor(
        public name : string,               //
        public description: string,         // 
        public version: string,             //
        public ownerId: number, 
        public sourceRepositoryLink: string,// 
        public fileId: number, 
        public tags: string[], 
        public productPictureId?: number, 
        public numberOfDownloads?: number, 
        public openIssues?: number, 
        public pullRequests?: number, 
        public lastCommitDate? : Date,
        public productState?: string,     //TODO: type? 
        public id? : number, 
        public active? : boolean, 
    ){ }
}