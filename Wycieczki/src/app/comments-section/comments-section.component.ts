import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOpinion } from '../interfaces/opinion';
import { CommentHandlingService } from '../services/comment-handling.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {

  opinions: IOpinion[];

  postForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    opinion: new FormControl('', [Validators.required,
    Validators.minLength(50),
    Validators.maxLength(500)]),
    date: new FormControl('')
  })

  constructor(private commentHandlingService: CommentHandlingService) {
    this.opinions = this.commentHandlingService.returnOpinions().slice();
  }

  ngOnInit(): void {
    this.commentHandlingService.getOpinion().subscribe(opi => {
      this.opinions = opi;
      this.opinions = this.commentHandlingService.returnOpinions().slice();
    })
  }

  sendOpinion() {
    let opinionToSend: IOpinion = {
      login: String(this.postForm.get('login')!.value),
      name: String(this.postForm.get('name')!.value),
      opinion: String(this.postForm.get('opinion')!.value),
      date: String(this.postForm.get('date')!.value)
    }
    this.commentHandlingService.addOpinion(opinionToSend);
    this.opinions = this.commentHandlingService.returnOpinions().slice();
    this.postForm.reset();
  }
  seeMoreOpinion() {
    this.opinions = this.commentHandlingService.returnOpinions().slice();
  }
}