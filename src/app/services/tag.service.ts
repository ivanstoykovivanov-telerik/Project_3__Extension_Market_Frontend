import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  
  constructor(
    private http: HttpClient
  ) { }

  public getTags(){
    return this.http.get<Tag[]>(AppComponent.API_URL + "/tags" ); 
  }

  public addTag(tag: Tag){
    return this.http.post<Tag>(AppComponent.API_URL + "/tags/add", tag ); 
  }
  
  public deleteTag(tag: Tag){
    return this.http.post<Tag>(AppComponent.API_URL + "/tags/delete", tag ); 
  }

}
