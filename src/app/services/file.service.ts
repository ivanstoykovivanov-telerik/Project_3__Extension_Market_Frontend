import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { RequestOptions, ResponseContentType } from '@angular/http';

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
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.get(`${AppComponent.API_URL}/files/file/get/${id}`,   { headers, responseType: 'blob'});
    return this.http.get(`${AppComponent.API_URL}/files/files/download/product/${id}`);
  }

}
