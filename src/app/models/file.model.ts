export class FileModel{
    
    constructor(
        public fileName : string,
        public type: string,  
        public size: number,     
        public fileLocation: string,
        public downloadLink: string,
        public ownerId: number
    ){ }
}