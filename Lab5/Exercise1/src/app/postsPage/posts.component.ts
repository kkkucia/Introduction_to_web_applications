import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit{

  posts: any[] = [];

  postForm = new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    name: new FormControl('')
  })

  constructor(private dataService: DataServiceService){}



ngOnInit(): void {
  this.dataService.getPosts().subscribe(dataPosts => this.posts = dataPosts)
}

sendPost(){
  let postToSend = {
    "userId": 0,
    "id": this.posts.length + 1,
    "title": this.postForm.get('title')!.value,
    "body": this.postForm.get('text')!.value
  }
  this.dataService.sendPost(JSON.stringify(postToSend)).subscribe(data => this.posts.splice(0, 0, postToSend))
}
}