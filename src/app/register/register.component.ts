import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    username: 'holderu',
    password: 'passwordu'
  };
  register_res: any;
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onSubmit(f: NgForm): void {
    this.user.username = f.value.username;
    this.user.password = f.value.password;
    console.log(this.user);
    this.authService.postRegister(this.user).subscribe((res: Response) => {
      this.register_res = res.json();
      console.log(this.register_res);
      if (this.register_res.message === 'user created succesfully') {
        localStorage.setItem('reg_success', 'Registration was successful');
        this.authService.postLogin(this.user).subscribe((resp: Response) => {
          const response = resp.json();
          console.log(resp);
          localStorage.setItem('token', response.token );
          this.router.navigate(['/bucketlists']);
        });
      } else {
        this.message = this.register_res.message;
      }
    }, (error) => {
      console.log('in catch');
      if (error.status === 400 ) {
        console.log(error._body);
        JSON.parse(error._body);
        const error_message: any = JSON.parse(error._body);
        console.log(error_message.message);
        this.message = error_message.message;
        console.log(this.message);
        }
    });
  }
}
