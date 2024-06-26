
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (currentUser && currentUser.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
