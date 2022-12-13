import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit{

  photos: any[] = [];

  constructor(private dataService: DataServiceService){}


  ngOnInit(): void {
    this.dataService.getPhotos().subscribe(dataPhotos => this.photos = dataPhotos)
  }
}
