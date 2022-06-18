import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'flash-messages-angular';
import { MainServiceService } from './services/main-service.service';

import { MaterialModule } from './material/material.module';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { HousesComponent } from './components/houses/houses.component';
import { EachHouseComponent } from './components/each-house/each-house.component';
import { EachHouseDisplayerComponent } from './components/each-house-displayer/each-house-displayer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogComponent } from './dialog/dialog.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';



const routes : Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'viewHouse', component:EachHouseDisplayerComponent},
  {path:'admin', component:AdminLoginComponent},
  {path:'adminPage', component:AdminPageComponent}

 
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    NavBarComponent,
    FetchDataComponent,
    HousesComponent,
    EachHouseComponent,
    EachHouseDisplayerComponent,
    LandingPageComponent,
    DialogComponent,
    AdminLoginComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    FlexLayoutModule
  ],
  providers: [MainServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
