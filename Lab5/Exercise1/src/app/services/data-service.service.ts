import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPhoto } from '../interfaces/Iphoto';
import { IPost } from '../interfaces/Ipost';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataServiceService {

  constructor(private http : HttpClient) { }

  getPhotos(): Observable<JSON[]>{
    return this.http.get<JSON[]>("https://jsonplaceholder.typicode.com/photos")
  }

  getOnePhoto(id:number): Observable<IPhoto>{
    return this.http.get<IPhoto>("http://jsonplaceholder.typicode.com/photos/" + id.toString())
  }

  getPosts(): Observable<JSON[]>{
    return this.http.get<JSON[]>("https://jsonplaceholder.typicode.com/posts");
  }

  sendPost(body: string): Observable<IPost>{
    return this.http.post<IPost>("http://jsonplaceholder.typicode.com/posts", body, httpOptions)
  } 
}
