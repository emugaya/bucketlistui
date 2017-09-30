import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { BucketlistsComponent } from '../bucketlists/bucketlists.component';
import { ItemsComponent } from '../items/items.component';


const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'home', pathMatch: 'full', component: HomeComponent},
	{ path: 'login',  component: LoginComponent},
	{ path: 'register',  component: RegisterComponent},
	{ path: 'bucketlists',
	  component: BucketlistsComponent,
	  canActivate: [AuthGuard]
	},
	{ path: 'bucketlist/:id', 
	  component: ItemsComponent,
	  canActivate: [AuthGuard]
	},
]

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
