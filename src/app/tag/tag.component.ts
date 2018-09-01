import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags: Tag[]; 
  tagFromChild: Tag ; 


  constructor(
    private tagService: TagService 
  ){ }

  ngOnInit() {
    this.tagService.getTags()
      .subscribe(data => {
        this.tags = data; 
      }); 
  }

  getTag($event){
    console.log("getEvent");
    console.log($event);
    this.tags.push($event);
  }


  onDelete(tag){
    console.log("Deleting...");
    console.log(tag);
    this.tagService.deleteTag(tag).subscribe(); 
    this.tags = this.tags.filter(e => tag.id !== e.id); 
  }
}
