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
  currentUser = {}

  constructor(private http: HttpClient, public router: Router) { }

  signUp(user: User): Observable<any> {
    return this.http.post(`${API_URL}/users`, user).pipe(catchError(this.handleError));
  }
  signIn(user: User) {
    return this.http
        .post<any>(`${API_URL}/auth/login`, user)
        .subscribe((res: any) => {
          localStorage.setItem('jwt_token', res.token);
          this.getUserProfile(res.id).subscribe((res) => {
            this.currentUser = res;
            this.router.navigate(['profil/' + res.msg.id]);
          })
        })
  }
  getToken(){
    return localStorage.getItem('jwt_token')
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('jwt_token');
    return authToken !== null ? true : false
  }
  doLogout() {
    let remove_token = localStorage.removeItem('jwt_token');
    if (remove_token == null) {
      this.router.navigate(['login']);
    }
  }
  getUserProfile(id: any): Observable<any> {
    let api = `${API_URL}/users/${id}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
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
