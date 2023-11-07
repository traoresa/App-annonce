import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})


export class AuthorityGuard implements CanActivate {

  constructor(private AuthBaseService: BaseService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Vérifier si user connecté
    if (this.AuthBaseService.isAuth()) {
      return true;
    }    

    // sinon redirection dehors
    this.router.navigateByUrl('/');
    return false;
  }
  
}
