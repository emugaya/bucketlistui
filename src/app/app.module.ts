import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule
 } from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Services
import { AuthGuard} from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BucketlistsService } from './services/bucketlists.service';

// Router
import { AppRoutingModule } from './app-routing/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BucketlistsComponent } from './bucketlists/bucketlists.component';
import { ItemsComponent } from './items/items.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BucketlistsComponent,
    ItemsComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    BucketlistsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
