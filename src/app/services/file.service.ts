import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';

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

  // MARTO version
  downloadFile(id : number){
    const headers = new HttpHeaders().set('enctype', 'multipart/form-data');
    return this.http.get(`${AppComponent.API_URL}/files/download/product/${id}`,   { headers, responseType: 'blob' });
  }

  // Tutorial  -saves the file as a JSON 
  // downloadFileT(id : number){
  //   return this.http.get(`${AppComponent.API_URL}/files/download/product/${id}`, { 
  //     responseType: 'blob' , 
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }

  // Tutorial  -saves the file as a JSON 
  downloadFileT(id : number){
    return this.http.get(`${AppComponent.API_URL}/files/download/product/${id}`, { 
      responseType: 'blob' 
      // headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  



  //const headers = new HttpHeaders().set('Content-Type', 'application/json');
  // return this.http.get(`${AppComponent.API_URL}/files/download/product/${id}`,   { headers, responseType: 'blob'});
  //return this.http.get(`${AppComponent.API_URL}/files/download/product/${id}`);
  

  //Download
  // download(documentId: string): Observable<any> {
  //   // set headers for the file and response to be Blob
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const options = new RequestOptions({ headers: headers });
  //   options.responseType = ResponseContentType.Blob;

  //   return this.http.get(`${AppComponent.API_URL}/${documentId}`, options)
  //     .map((res: Response) => res)
  //     .catch(this.handleError);
  // }
  // // handle error
  // private handleError (error: any) {
  //   return Observable.throw(error);
  // }

}
