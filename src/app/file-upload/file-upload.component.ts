import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models/file.model';
import { FileService } from '../services/file.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  currentFile: File = null; 
  currentUser: User ; 

  constructor(
     private fileService: FileService, 
     private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.currentUser
      .subscribe(data => this.currentUser = data)
  }

  onFileSelected($event){
    this.currentFile = $event.target.files[0]; 
    // this.currentFile = new FileModel(file.name, )
    // this.currentFile = new FileModel(file.fileName, file.type, file.size. file.)
    //  file.type
    //  file.fileName
    //  file.size
    //  file.type
  }

  onUpload(event){
    event.stopPropagation();
    console.log("Uploading file");
    console.log(this.currentUser);
    console.log(this.currentFile);
    
    this.fileService.upload(this.currentFile, this.currentUser.id)
      .subscribe(
        data => console.log(data)
      )
  }

}
