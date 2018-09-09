
export class Product{
    
    constructor(
        public name : string,               
        public description: string,        
        public version: string,             
        public ownerId: number, 
        public sourceRepositoryLink: string,
        public fileId: number, 
        public tags: string[], 
        public featuredProduct: boolean, 
        public productPictureId?: number, 
        public numberOfDownloads?: number, 
        public openIssues?: number, 
        public pullRequests?: number, 
        public lastCommitDate? : Date,
        public productStatus?: string,     
        public id? : number, 
        public active? : boolean, 
    ){ }
}