import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-one-photo',
  templateUrl: './one-photo.component.html',
  styleUrls: ['./one-photo.component.scss']
})
export class OnePhotoComponent implements OnInit, OnDestroy{

  constructor(private route: ActivatedRoute, private dataService: DataServiceService){}

  private subscription: Subscription | undefined
  id: number = -1;
  photoUrl: string = "";

  
  ngOnInit(): void {
     this.subscription = this.route.params.subscribe(parameter => {
          this.id = parameter['id'];
        })
      this.dataService.getOnePhoto(this.id).subscribe(onePhoto => this.photoUrl = onePhoto.url)
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }

}
