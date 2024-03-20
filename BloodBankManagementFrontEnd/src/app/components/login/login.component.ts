import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatorRequest } from '../../model/AuthenticationRequest';
import { RegistrationService } from '../../services/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login = new AuthenticatorRequest('', '');
  msg = '';

  isAdminLogin: boolean = false;

  constructor(private _service: RegistrationService, private _router: Router) { }

  ngOnInit(): void { }


  toggleAdminLogin() {
    this.isAdminLogin = !this.isAdminLogin;
  }

  toggleUserLogin() {
    this.isAdminLogin = !this.isAdminLogin;
  }

  loginUser() {
    this._service.loginUserFromRemote(this.login.email, this.login.password).subscribe(
      (data: any) => {
        console.log(data);
        console.log("Response Received");
        sessionStorage.setItem('loggedUser', this.login.email);
        sessionStorage.setItem('USER', "user");
        sessionStorage.setItem('ROLE', "user");
        Swal.fire({
          title: "Login Success!",
          icon: "success"
        });
        this._router.navigate(['/userdashboard']);
      },
      (error: { error: any; }) => {
        console.log(error.error);
        this.msg = "Bad credentials, please enter valid credentials !!!";
      }
    )
  }

  adminLogin() {
    const adminEmail = 'sachinadmin@gmail.com';
    const adminPassword = 'sachin7788';

    if (this.login.email === adminEmail && this.login.password === adminPassword) {
      console.log("Admin login successful");
      sessionStorage.setItem('loggedUser', this.login.email);
      sessionStorage.setItem('USER', "admin");
      sessionStorage.setItem('ROLE', "admin");
      Swal.fire({
        title: "Admin Login Success!",
        icon: "success"
      });
      this._router.navigate(['/loginsuccess']);
    } else {
      this.msg = 'Bad admin credentials !!!';
    }
  }
}
