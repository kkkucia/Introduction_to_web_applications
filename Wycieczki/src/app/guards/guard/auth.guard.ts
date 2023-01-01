import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.getAuthenticated().pipe(
        map((state) => {
          if (state == null) {
            this.router.navigate(['']);
            return false;
          }
          this.auth.userData = state;
          return true;
        })
      );
    }
  }