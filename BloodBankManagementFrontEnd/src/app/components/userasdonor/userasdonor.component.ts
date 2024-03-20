import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Donors } from 'src/app/model/Donors';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-userasdonor',
  templateUrl: './userasdonor.component.html',
  styleUrls: ['./userasdonor.component.scss']
})
export class UserasdonorComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  msg = '';
  donor = new Donors('', '', 'O+ve', 1, '', 'Male', 0, '', '', new Date());

  constructor(private _router: Router, private donorService: DonorService) { }

  ngOnInit(): void {
    this.tempUser = sessionStorage.getItem('loggedUser') || '{}';

    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;
    this.msg = '';
  }

  navigateHome() {
    this._router.navigate(['/userdashboard']);
  }

  addDonor() {
    this.donorService.requestForAddingDonor(this.donor).subscribe(
      data => {
        this.donor = data;
        console.log("Added as a Donor Successfully");
        this.msg = "Donor Added Successfully !!!";
        this._router.navigate(['/userdashboard']);
      },
      error => {
        console.log("Process Failed");
        console.log(error.error);
      }
    )
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
