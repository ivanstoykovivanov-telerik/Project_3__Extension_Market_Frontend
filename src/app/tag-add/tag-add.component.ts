import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.css']
})
export class TagAddComponent implements OnInit {
  tagAddForm: FormGroup;
  tags : Tag[]; 
  addTagValue: string  = null;
  newTag: Tag; 
  @Output() tagAddedEvent = new EventEmitter<Tag>();
  
  constructor(
    private tagService: TagService , 
    private formBuilder: FormBuilder 
  ) { }

  ngOnInit() {
    this.tagAddForm = this.formBuilder.group({
      tagName: ['', [Validators.minLength(3), Validators.maxLength(10) ]]
    })
   }

  onTagAdd(event){
    let tag: Tag = new Tag(event.target.value);  
    console.log(tag);
    
    //saved Tag to DB
    this.tagService.addTag(tag)
    .subscribe(
      (tagNew: Tag ) => {
          //clear the input
          this.addTagValue = ' ';
          this.newTag = tagNew; 
          // console.log(this.newTag);
          this.tagAddedEvent.emit(this.newTag);
        }
      );
  }
}
