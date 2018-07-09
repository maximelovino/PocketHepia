import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class HttpTokenInterceptorService implements HttpInterceptor {

	constructor(private userService: UserService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.userService.getToken().pipe(flatMap(token => {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
			return next.handle(request);
		}));
	}
}
