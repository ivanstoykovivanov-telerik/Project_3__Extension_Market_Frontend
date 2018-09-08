import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';

@Component({
  selector: 'app-tag-section',
  templateUrl: './tag-section.component.html',
  styleUrls: ['./tag-section.component.css']
})
export class TagSectionComponent implements OnInit {
  tagAddForm: FormGroup;
  tags : Tag[] = [] ; 
  newTag : Tag ; 
  @Output() tagAddedEvent = new EventEmitter<Tag>();
  @Output() tagDeletedEvent = new EventEmitter<Tag>(); 
  addTagValue; 

  constructor(
    private tagService: TagService, 
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit() {
    this.tagAddForm = this.formBuilder.group({
      tagName: ['', [Validators.minLength(3), Validators.maxLength(10) ]]
    })
   }

  onTagAdd($event){
    let tag: Tag = new Tag($event.target.value);  
    console.log(tag);
    this.tags.push(tag);
    this.addTagValue ="";  
    this.tagAddedEvent.emit(tag);
  }

  onDelete(tag:Tag){
    console.log("Deleting...");
    console.log(tag);
    this.tagDeletedEvent.emit(tag);
    this.tags = this.tags.filter(e => tag.tagName !== e.tagName);
  }


}
