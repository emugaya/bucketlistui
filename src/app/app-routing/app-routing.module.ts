import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';

import { BucketlistsComponent } from '../bucketlists/bucketlists.component';
import { ItemsComponent } from '../items/items.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent},
    { path: 'register',  component: RegisterComponent},
    { path: 'bucketlists',
    component: BucketlistsComponent,
    canActivate: [AuthGuard]},
    { path: 'bucketlist/:id',
    component: ItemsComponent,
    canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      CommonModule
  ],
  declarations: [],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
