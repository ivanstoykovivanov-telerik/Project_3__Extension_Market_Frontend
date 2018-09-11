import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models/file.model';
import { FileService } from '../services/file.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

/*
Used for FIILE and IMAGE Upload
*/


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  currentFile: File = null; 
  currentUser: User ; 
  disabled = true; 
  @Input() buttonLabel; 
  @Input() uploadType: string; 
  @Output() onFileSaved = new EventEmitter(); 
  @Output() onProductPictureSaved = new EventEmitter(); 
  // @Output() messageEvent = new EventEmitter<string>();


  constructor(
     private fileService: FileService, 
     private authService: AuthService, 
     private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.authService.currentUser
      .subscribe(data => this.currentUser = data)
  }

  onFileSelected($event){
    this.currentFile = $event.target.files[0]; 
    this.disabled = false; 
    //Upload 
    this.upload(); 
  }

  upload(){
    // event.stopPropagation()
    if(this.uploadType === "image"){
      console.log("In");
      this.uploadIMAGE(this.currentFile, this.currentUser.id)  
    }else{
      this.uploadBINARY(this.currentFile, this.currentUser.id)  
    }   
  }

  
  //TODO: 
  uploadIMAGE(file, id){
    this.fileService.uploadImage(this.currentFile, this.currentUser.id)
      .subscribe(
        (data: any ) => {
          if(data){
            console.log(data);
            console.log(data.id);
            this.onProductPictureSaved.emit(data.id); 
            this.showSuccess( "uploaded successfully", data.fileName); 
          } 
        }
    )
  }

  
  uploadBINARY(file, id){
    this.fileService.uploadBinary(this.currentFile, this.currentUser.id)
      .subscribe(
        (data: any ) => {
          if(data){
            console.log(data);
            this.onFileSaved.emit(data.id); 
            this.showSuccess( "uploaded successfully", data.fileName); 
          } 
        }
    )
  }

  /* TOAST  */ 
  showSuccess(title: string , content: string) {
    this.toastr.success(title, content);
  }

}
