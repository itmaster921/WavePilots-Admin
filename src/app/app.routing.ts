import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { UsermgmtComponent } from './usermgmt/usermgmt.component';
import { RegisterComponent } from './auth/register/register.component';
// import { PageNotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes =[
      { path: 'home',         component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login',        component: LoginComponent },
      { path: 'register',     component: RegisterComponent },
      { path: 'usermgmt',     component: UsermgmtComponent },
      { path: '',   redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

