import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOpinion } from '../interfaces/opinion';
import { ITravel } from '../interfaces/travel';
import { AuthenticationService } from '../services/authentication.service';
import { CommentsHandlingService } from '../services/comments-handling.service';

import { FirebaseDataService } from '../services/firebase-data.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit{

  opinions: IOpinion[];
  @Input() travel: ITravel;
  canBeCommented: boolean = false;

  postForm = new FormGroup({
    opinion: new FormControl('', [Validators.required,
    Validators.minLength(50),
    Validators.maxLength(500)]),
    date: new FormControl('')
  })

  constructor(private commentHandlingService: CommentsHandlingService, public auth: AuthenticationService, public db: FirebaseDataService) { }


  ngOnInit(): void {
    this.checkIfCanBeCommented();
    this.opinions = this.commentHandlingService.getOpinions(this.travel);
  }

  checkIfCanBeCommented(){
    if(this.auth.userRoles.manager == true){
      this.canBeCommented =  true;
    }else if(this.auth.userRoles.admin == true || this.auth.userRoles.banned == true){
      this.canBeCommented =  false;
    }else{
      this.db.getHistory().subscribe((items: any)=> {
        for (let i of items) {
            if (this.travel.name == i.payload.val().name && this.travel.country == i.payload.val().country && i.payload.val().customer == this.auth.userData.uid) {
              this.canBeCommented =  true
              break
          }
        }
        })
    }
  }

  sendOpinion() {
    this.checkIfCanBeCommented();

    if(this.canBeCommented){
      let opinionToSend: IOpinion = {
        login: String(this.auth.userData.email),
        uid: String(this.auth.userData.uid),
        name: String(this.travel.name),
        country: String(this.travel.country),
        opinion: String(this.postForm.get('opinion')!.value),
        date: String(this.postForm.get('date')!.value)
      }
      this.db.addToOpinions(opinionToSend)
      this.postForm.reset();
      this.opinions = this.commentHandlingService.getOpinions(this.travel);
    }
  }

  
}