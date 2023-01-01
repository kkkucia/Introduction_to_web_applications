import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../interfaces/roles';
import { User } from '../interfaces/user';
import { FirebaseDataService } from './firebase-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  userData: any = null;
  userRoles: Roles = {
    banned: false,
    guest: true,
    admin: false,
    manager: false,
    client: false,
  };
  
  persistence: string = "local";


  constructor(private fireAuth: AngularFireAuth, private router: Router, private db: FirebaseDataService) {
    

    fireAuth.authState.subscribe(async (event: any) => {
      if (event) {
        this.userData = event;
        const roles = await this.db.getUserRoles(event.uid);
        this.userRoles = roles as Roles;
      }
      else {
        this.userData = null;
        this.userRoles = {
          banned: false,
          guest: true,
          admin: false,
          manager: false,
          client: false
        }
      }
    })
  }

  getAuthenticated(): Observable<any> {
    return this.fireAuth.authState;
  }

  getUserData() {
    return this.fireAuth.currentUser;
  }

  signOut() {
    return this.fireAuth.signOut().then((event: any) => {
      this.router.navigate(['']);
    })
  }

  createNewUser(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then((userInfo) => {
        let newUser = new User(userInfo.user);
        this.db.safeNewUser(newUser);
        this.router.navigate(['cardList']);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

  signInEmailPass(email: string, password: string) {
    return this.fireAuth.setPersistence(this.persistence).then(() => {
      return this.fireAuth.signInWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigate(['cardList']);
        })
        .catch((error) => {
          alert(error.message);
        })
    })
  }
  
  changePersistence(newPersistence: string) {
    this.persistence = newPersistence;
    //this.fireAuth.setPersistence(this.persistence)
  }
}
