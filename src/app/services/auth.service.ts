import { any } from 'codelyzer/util/function';
import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response  } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { SERVER } from '../server';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  token: any = '';
  current_user: string;

  constructor(private http: Http, private router: Router) {

  }
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  logout(): void {
    this.isLoggedIn = false;
  }


// Headers to be used for post and  put
  postHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(this.token + ':' + 'unused'));
    headers.append('Accept', 'application/json');
    const requestoptions = new RequestOptions({
            headers: headers
        });
    return requestoptions;

  }
  // Headers used for get and delete metthods

  getHeaders() {
    const headers = new Headers;
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + btoa(this.token + ':' + 'unused'));
    const requestoptions = new RequestOptions({
            headers: headers
        });
        return requestoptions;
  }
  // Headers used for user registration and Longin

  authHeaders() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const requestoptions = new RequestOptions({
            headers: headers
        });
        return requestoptions;
  }

  // This method handles user Login
  postLogin(user): Observable<any> {
    const x = this.http.post(SERVER + 'auth/login/', user, this.authHeaders());
    return this.http.post(SERVER + 'auth/login/', user, this.authHeaders());
  }

  // This method handles user Registration
  postRegister(user) {
    return this.http.post(SERVER + 'auth/register/', user, this.authHeaders());

  }
  checkTimeOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
