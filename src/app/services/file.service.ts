import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    public http: HttpClient
  ) { }

  upload(file: File, id: number){
    console.log("In");
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file); 

    return this.http.post(`${AppComponent.API_URL}/files/upload/file/${id}`, formData );
  }

}
