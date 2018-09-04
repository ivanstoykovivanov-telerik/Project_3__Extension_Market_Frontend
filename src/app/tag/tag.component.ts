import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';
import {Observable, from } from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Output() tagDeletedEvent = new EventEmitter<Tag>(); 
  tags: Tag[] = []; 
  tagFromChild: Tag ; 

  constructor(
    private tagService: TagService 
  ){ }

  ngOnInit() {
    this.tagService.currentTag
      .subscribe(
        data => this.tags.push(data)
      )
  }

  // receiveTagFromParent(){
  //   console.log("getEvent");
  //   console.log($event);
  //   this.tags.push($event);  //this should go to form
  // }

  onDelete(tag: Tag){
    console.log("Deleting...");
    console.log(tag);
    //this.tagService.tags = this.tags.filter(e => tag.tagName !== e.tagName);  
    
    this.tagDeletedEvent.emit(tag); 
    this.tags = this.tags.filter(e => tag.tagName !== e.tagName); 
  }

}
