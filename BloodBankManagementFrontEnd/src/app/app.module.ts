import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { LoginsuccessComponent } from './components/loginsuccess/loginsuccess.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddingdonorComponent } from './components/addingdonor/addingdonor.component';
import { RegistrationsuccessComponent } from './components/registrationsuccess/registrationsuccess.component';
import { UserasdonorComponent } from './components/userasdonor/userasdonor.component';
import { BloodstockComponent } from './components/bloodstock/bloodstock.component';
import { DonorlistComponent } from './components/donorlist/donorlist.component';
import { RequestbloodComponent } from './components/requestblood/requestblood.component';
import { RequesthistoryComponent } from './components/requesthistory/requesthistory.component';
import { RequesthistoryfromuserComponent } from './components/requesthistoryfromuser/requesthistoryfromuser.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserdashboardComponent,
    LoginsuccessComponent,
    FooterComponent,
    AddingdonorComponent,
    RegistrationsuccessComponent,
    UserasdonorComponent,
    BloodstockComponent,
    DonorlistComponent,
    RequestbloodComponent,
    RequesthistoryComponent,
    RequesthistoryfromuserComponent,
    UserlistComponent,
    UserprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatIconModule,
    MatPaginatorModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
