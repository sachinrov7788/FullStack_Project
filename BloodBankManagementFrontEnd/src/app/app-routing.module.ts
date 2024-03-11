import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddingdonorComponent } from './components/addingdonor/addingdonor.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginsuccessComponent } from './components/loginsuccess/loginsuccess.component';
import { RouterGuard } from './guards/router.guard';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { BloodstockComponent } from './components/bloodstock/bloodstock.component';
import { DonorlistComponent } from './components/donorlist/donorlist.component';
import { RequestbloodComponent } from './components/requestblood/requestblood.component';
import { UserGuard } from './guards/user.guard';
import { RequesthistoryComponent } from './components/requesthistory/requesthistory.component';
import { RequesthistoryfromuserComponent } from './components/requesthistoryfromuser/requesthistoryfromuser.component';
import { UserasdonorComponent } from './components/userasdonor/userasdonor.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { RegistrationsuccessComponent } from './components/registrationsuccess/registrationsuccess.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginsuccess', component: LoginsuccessComponent, canActivate: [RouterGuard] },
  { path: 'registration', component: RegistrationComponent },
  { path: 'registrationsuccess', component: RegistrationsuccessComponent },
  { path: 'userdashboard', component: UserdashboardComponent, canActivate: [RouterGuard] },
  { path: 'addDonor', component: AddingdonorComponent, canActivate: [AdminGuard] },
  { path: 'bloodStock', component: BloodstockComponent },
  { path: 'donorlist', component: DonorlistComponent },
  { path: 'requestblood', component: RequestbloodComponent, canActivate: [UserGuard] },
  { path: 'requesthistory', component: RequesthistoryComponent, canActivate: [AdminGuard] },
  { path: 'requesthistoryfromuser', component: RequesthistoryfromuserComponent, canActivate: [UserGuard] },
  { path: 'userasdonor', component: UserasdonorComponent, canActivate: [UserGuard] },
  { path: 'userlist', component: UserlistComponent, canActivate: [AdminGuard] },
  { path: 'userprofile', component: UserprofileComponent, canActivate: [UserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
