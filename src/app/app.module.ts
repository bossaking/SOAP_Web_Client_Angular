import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { NgxSoapModule } from 'ngx-soap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { HeaderComponent } from './header/header.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { HomeComponent } from './home/home.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { NewEventDialogComponent } from './new-event-dialog/new-event-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import { EditEventDialogComponent } from './edit-event-dialog/edit-event-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    NewEventDialogComponent,
    EditEventDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: '', component: HomeComponent}
    ]),
    ReactiveFormsModule,
    NgxSoapModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgxSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
