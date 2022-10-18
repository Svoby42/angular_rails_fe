import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

const API_URL = `${environment.BASE_URL}/api/v1`

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentTime: any;
  currentUser: any = {};
  loggedOut = false;
  token: string = "";

  constructor(private http: HttpClient, public router: Router) {
    this.getToken()
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
  getUserProfile(): Observable<any>{
    let api = `${API_URL}/users/${this.getIdFromToken()}`;
    return this.http.get(api, { headers: this.headers }).pipe(catchError(this.handleError))
  }
  updatePassword(values: any, id: any){
    return this.http.patch(`${API_URL}/users/${id}`, values).pipe(catchError(this.handleError));
  }
  public getToken(){
    this.token = localStorage.getItem('jwt_token')!;
    return this.token;
  }
  public tokenExpired(){
    this.getToken()
    const result = (JSON.parse(atob(this.token.split('.')[1])));
    this.currentTime = Math.round(new Date().getTime() / 1000);
    console.log(this.currentTime > result.exp);
    if (this.currentTime > result.exp){
      this.doLogout;
      this.loggedOut = true;
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 5000)  // po 5 sekundach redirect na login page pokud jwt vypršel
    }
  }
  public getIdFromToken(){
    const result = (JSON.parse(atob(this.getToken().split('.')[1])))
    return result.id
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
