import { errorObject } from 'rxjs/util/errorObject';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService} from '../services/auth.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import 'rxjs/add/operator/map';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { username: 'holderu', password: 'passwordu' };
  token = '';
  message: any = '';
  login_res: any = {};
  data: Object;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm): void {
    this.user.username = f.value.username;
    this.user.password = f.value.password;
    this.authService.postLogin(this.user).subscribe((res: Response) => {
      this.authService.isLoggedIn = true;
      this.login_res = res.json();
      this.token = this.login_res.token;
      this.authService.token = this.login_res.token;
      this.authService.current_user = this.user.username;
      this.message = this.login_res.message;
      // localStorage.setItem('currentuser', this.user.username);
      // localStorage.setItem('token', this.token);
      this.router.navigate(['/bucketlists']);
    }, (error) => {
      if (error.status === 400 ) {
        this.message = 'Invalid username or password';
        }
    });
  }
}
