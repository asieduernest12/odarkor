import { OthersModule } from './../others/others.module';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OthersModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      { path: "", component: HomeComponent },
      { path: "login", component: LoginComponent },
      {path: "profile/:id", component: ProfileComponent}
    ])
  ],
  declarations: [HomeComponent, NavbarComponent, LoginComponent, PostComponent, ProfileComponent],
  exports: [NavbarComponent]
})
export class CoreModule { }
