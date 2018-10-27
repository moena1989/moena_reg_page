import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DbService} from './services/db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private db: DbService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // TODO revisar bien como funciona el auth del log, para evitar recargar la pagina todo el tiempo

    if (!this.db.authenticated) {
      this.router.navigate(['/login']);
      console.log('Usuario sin autenticar. Redireccionando...');
      return false;
    }

    //   const osb = localStorage.getItem('ob_login');
    //
    //   if (ob != null) {
    //     console.log('Se encontró el ob_log y se cargo :D');
    //     this.db.authState = ob;
    //   } else {
    //     console.log('no existe save guardado');
    //   }

    // const osb = localStorage.getItem('ob_login');
    // if (osb != null) {
    //   console.log('Se encontró el ob_log y se cargo :D');
    //   this.db.authState = osb;
    // } else {
    //   console.log('no existe save guardado');
    // }

    return true;
  }
}
