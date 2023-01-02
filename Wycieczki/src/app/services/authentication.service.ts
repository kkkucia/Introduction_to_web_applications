import { Injectable} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from '../interfaces/roles';
import { User } from '../interfaces/user';
import { FirebaseDataService } from './firebase-data.service';
import { getAuth, browserSessionPersistence, inMemoryPersistence, browserLocalPersistence} from "firebase/auth";
import { update } from 'firebase/database';

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
  persistence: string;
  perSub: any;

  constructor(private fireAuth: AngularFireAuth, private router: Router, private db: FirebaseDataService) {


    this.perSub = this.db.getPeristance().subscribe((change:any) => {
      for(let i of change){
        this.persistence = i.payload.val();
        break;
      }
  })
  

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
        this.router.navigate(['mainPage']);
      })
      .catch((error) => {
        alert(error.message);
      })
  }

 
signInEmailPass(email: string, password: string) {
  this.changePersistence(this.persistence)
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['mainPage']);
      })
      .catch((error) => {
        alert(error.message);
      })
}

  changePersistence(newPersistence: string) {
    this.persistence = newPersistence;
    this.db.updatePersistance(newPersistence);
    const auth = getAuth();
    switch(this.persistence){
      case "local":
        auth.setPersistence(browserLocalPersistence);
      break;
      case "session":
        auth.setPersistence(browserSessionPersistence)
      break;
      case "none":
        auth.setPersistence(inMemoryPersistence)
    }
  }
}
