import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (req.headers.get('noauth')) {
        return next.handle(req.clone());
    }
    else {
        const clonedreq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.userService.getToken())
        });
        return next.handle(clonedreq).pipe(
            tap(
                event => { },
                err => {
                    if (err.error.auth === false) {
                        this.router.navigateByUrl('/login');
                    }
                })
        );
    }
}

}
