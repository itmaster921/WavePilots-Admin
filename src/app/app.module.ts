import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

import { AppRoutingModule } from './app.routing';
import { AuthModule } from './auth/auth.module';
import { UsermgmtModule } from './usermgmt/usermgmt.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from 'angularfire2';

import { firebaseConfig } from './app.constants';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,

    AuthModule,
    HomeModule,
    UsermgmtModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
