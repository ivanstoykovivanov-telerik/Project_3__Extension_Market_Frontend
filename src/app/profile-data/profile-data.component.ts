import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {
  
  modalRef: BsModalRef;
  currentUser: User;
  @ViewChild('lgModal') public lgModal: ModalDirective; 


  constructor(
    private authService: AuthService, 
    private modalService: BsModalService
  ) { }


  ngOnInit() {
    this.authService.currentUser.subscribe(data => this.currentUser = data)
  }


  // hideModal($event){
  //   console.log($event);
  //   this.lgModal.hide(); 
  // }

  hideModal(){
    console.log(this.lgModal);
    this.lgModal.hide();
 }
  
}
