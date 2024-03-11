import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { RegisterRequest } from '../../model/RegisterRequest';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  register = new RegisterRequest('', '', '', '', 0, '', '', '');
  msg = '';

  constructor(private _service: RegistrationService, private _router: Router) { }

  ngOnInit(): void {
  }


  registerUser() {
    this._service.registerUserFromRemote(this.register).subscribe(
      data => {
        this.register = data;
        console.log("Registration Success");
        localStorage.setItem("username", this.register.name);
        this._router.navigate(['/registrationsuccess']);
      },
      error => {
        console.log("Registration Failed");
        console.log(error.error);
        this.msg = "User with " + this.register.email + " already exists !!!";
      }
    )
  }

}
