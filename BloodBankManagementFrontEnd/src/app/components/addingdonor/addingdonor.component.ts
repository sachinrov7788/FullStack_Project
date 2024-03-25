import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Donors } from 'src/app/model/Donors';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-addingdonor',
  templateUrl: './addingdonor.component.html',
  styleUrls: ['./addingdonor.component.scss']
})
export class AddingdonorComponent implements OnInit{

  loggedUser = '';
  tempUser = '';
  donor = new Donors('', '', 'O+ve', 1, '', 'Male', 0, '', '', new Date());
  today: string = '';

  constructor(private _service: DonorService, private _router: Router) { }

  ngOnInit(): void {
    this.tempUser = sessionStorage.getItem('loggedUser') || '{}';
    if (this.tempUser === 'string') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;
  }

  navigateHome() {
    if (this.loggedUser === 'sachinadmin@gmail.com') {
      this._router.navigate(['/loginsuccess']);
    } else {
      this._router.navigate(['/loginsuccess']);
    }
  }

  addDonor() {
    this._service.addDonorFromRemote(this.donor).subscribe(
      data => {
        this.donor = data;
        console.log("Donor added Successfully");
        this._router.navigate(['/loginsuccess']);
      },
      error => {
        console.log("process Failed");
        console.log(error.error);
      }
    )
  }
}
