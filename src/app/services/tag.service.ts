import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Tag } from '../models/tag.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
    // tags: Tag[] = [];
    tag: Tag; 
    private tagSource =  new BehaviorSubject<Tag>(this.tag);
    currentTag = this.tagSource.asObservable();

    updateTag(tag: Tag) {
      this.tagSource.next(tag); 
    }


constructor(
    private http: HttpClient
    ) {
      
  }

  // getTags() {
  //   return this.observableTags.asObservable();
  // }

  // addTag(tag: Tag) {
  //   this.tags.push(tag);
  //   this.observableTags.next(Object.assign({}, this.tags));
  // }

  // deleteTag(tag: Tag) {
  //   this.tags = this.tags.filter(el => el.tagName != tag.tagName);
  //   this.observableTags.next(Object.assign({}, this.tags));
  // }  


  // public getTags(){
  //   return this.http.get<Tag[]>(AppComponent.API_URL + "/tags" ); 
  // }

  // public addTag(tag: Tag){
  //   return this.http.post<Tag>(AppComponent.API_URL + "/tags/add", tag ); 
  // }
  
  // public deleteTag(tag: Tag){
  //   return this.http.post<Tag>(AppComponent.API_URL + "/tags/delete", tag ); 
  // }

}
