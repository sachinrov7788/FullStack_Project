import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BloodDetails } from 'src/app/model/BloodDetails';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-bloodstock',
  templateUrl: './bloodstock.component.html',
  styleUrls: ['./bloodstock.component.scss']
})
export class BloodstockComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  title = '';
  bloodDetails: BloodDetails[] = [];

  constructor(private donorService: DonorService, private _router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;

    this.getBloodDetails();

    if (this.loggedUser === "sachinadmin@gmail.com") {
      this.title = "Admin Dashboard";
    }
    else {
      this.title = "User Dashboard";
    }
  }

  getBloodDetails() {
    this.donorService.getBloodDetails().subscribe({
      next: data => {
        this.bloodDetails = data;
      },
      error: error => {
        console.error(error);

      }
    });
  }

  navigateHome() {
    if (this.loggedUser === "sachinadmin@gmail.com") {
      this.title = "Admin Dashboard";
      this._router.navigate(['/loginsuccess']);
    } else {
      this.title = "User Dashboard";
      this._router.navigate(['/userdashboard']);
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
