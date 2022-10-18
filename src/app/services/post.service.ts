import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

const API_URL = `${environment.BASE_URL}/api/v1`

@Injectable({
  providedIn: 'root'
})
export class PostService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, public router: Router) {

  }
  getTenNewestPosts(): Observable<any>{
    let api = `${API_URL}/posts?count=10`;
    return this.http.get(api).pipe(catchError(this.handleError));
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
