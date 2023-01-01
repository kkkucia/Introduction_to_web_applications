import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../services/authentication.service';
import { FirebaseDataService } from '../services/firebase-data.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit{


  constructor(public auth: AuthenticationService, private db:FirebaseDataService){}
  persistence: string = this.auth.persistence;
  users: User[] = [];

  ngOnInit(): void {
    this.db.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users){
        let newUser = new User(user.payload.val());
        newUser.uid = user.payload.key || 'undefined';
        this.users.push(newUser);
      }
    })
  }

  changePersistence(newPersistence: string): void{
    this.persistence = newPersistence;
    this.auth.changePersistence(newPersistence);
  }


  setUserRole(uid: string, role: string, change: boolean){
    this.db.changeUserRole(uid, role, String(change));
  }
}
