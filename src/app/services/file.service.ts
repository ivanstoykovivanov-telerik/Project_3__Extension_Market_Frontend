import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    public http: HttpClient 
  ) { }


  uploadBinary(file: File, id: number){
    console.log("In");
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file); 

    return this.http.post(`${AppComponent.API_URL}/files/upload/file/${id}`, formData);
  }


  uploadImage(file: File, id: number){
    console.log("In");
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file); 

    return this.http.post(`${AppComponent.API_URL}/files/upload/image/${id}`, formData);
  }

  getFile(id : number){
    return this.http.get(`${AppComponent.API_URL}/files/file/get/${id}`);
  }

}
