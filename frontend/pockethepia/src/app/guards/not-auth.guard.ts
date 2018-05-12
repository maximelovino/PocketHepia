import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isLoggedIn().pipe(tap(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    }), map(loggedIn => {
      return !loggedIn;
    }));
  }
}
