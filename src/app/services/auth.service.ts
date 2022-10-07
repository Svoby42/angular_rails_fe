import { Injectable } from '@angular/core';
import { User } from '../entities/user.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';

import { environment } from '../../environments/environment'

const API_URL = `${environment.BASE_URL}/api/v1`

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  signUp(user: User): Observable<any> {
    return this.http.post(`${API_URL}/users`, user).pipe(catchError(this.handleError));
  }
  signIn(user: User): Observable<any> {
    return this.http.post(`${API_URL}/auth/login`, user).pipe(catchError(this.handleError));
  }
  validateEmail(email: any){
    return this.http.post<any>(`${API_URL}/validate/email`, {"email": email}).pipe(catchError(this.handleError));
  }
  validateNick(nick: any){
    return this.http.post<any>(`${API_URL}/validate/name`, {"name": nick}).pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message
    } else {
      msg = `Chyba: ${error.status}\nZpráva: ${error.message}`;
    }
    return throwError(() => error);
  }
}
