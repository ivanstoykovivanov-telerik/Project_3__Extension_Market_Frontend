import { Component, OnInit, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Output() tagAddedEvent = new EventEmitter<Tag>(); 
  @Input() tags: Tag[]; 
  tagFromChild: Tag ; 

  constructor(
    private tagService: TagService 
  ){ }

  ngOnInit() {
    // this.tagService.getTags()
    //   .subscribe(data => {
    //     this.tags = data; 
    //   }); 
  }

  getTag($event){
    console.log("getEvent");
    console.log($event);
    this.tags.push($event);
  }


  onTagAdd($event){
    let tag = new Tag($event); 
    this.tags.push(tag); 
    this.tagAddedEvent.emit(tag); 
  }

  onDelete(tag:Tag){
    console.log("Deleting...");
    console.log(tag);
    this.tagDeletedEvent.emit(tag);
    this.tags = this.tags.filter(e => tag.tagName !== e.tagName); 
  }

  // receiveTagFromParent(){
  //   console.log("getEvent");
  //   console.log($event);
  //   this.tags.push($event);  //this should go to form
  // }


}
