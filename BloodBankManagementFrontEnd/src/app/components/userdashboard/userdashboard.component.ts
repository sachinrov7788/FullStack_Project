import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BloodDetails } from 'src/app/model/BloodDetails';
import { BloodRequest } from 'src/app/model/BloodRequest';
import { Donors } from 'src/app/model/Donors';
import { User } from 'src/app/model/User';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  msg = '';
  bloodRequests: BloodRequest[] = [];
  totalDonors: Donors[] = [];
  totalRequests!: BloodRequest[];
  donationCount: BloodRequest[] = [];
  totalUsers: User[] = [];
  totalBloodGroups: BloodDetails[] = [];
  totalUnits: number = 0;

  constructor(private _router: Router, private donorService: DonorService, private activatedRouter: ActivatedRoute) { }


  ngOnInit(): void {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;
    this.msg = '';

    this.donorService.getTotalDonors().subscribe({
      next: data => {
        this.totalDonors = data;
        // console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });

    this.donorService.getTotalUsers().subscribe({
      next: data => {
        this.totalUsers = data;
        // console.log(data);

      },
      error: error => {
        console.error(error);
      }
    });

    this.donorService.getTotalBloodGroups().subscribe({
      next: data => {
        this.totalBloodGroups = data;
        // console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });

    this.donorService.getTotalUnits().subscribe({
      next: data => {
        data.forEach((blood: { units: number; }) => {
          this.totalUnits += blood.units;
        });
      },
      error: error => {
        console.error(error);
      }
    });

    this.donorService.getRequestHistory().subscribe({
      next: (data: BloodRequest[]) => {
        this.bloodRequests = data.filter((request: BloodRequest) => request.email === this.loggedUser);
        // console.log(this.bloodRequests);
      },
      error: error => {
        console.error(error);
      }
    });

    this.donorService.getTotalRequests().subscribe({
      next: (data: BloodRequest[]) => {
        this.bloodRequests = data.filter((request: BloodRequest) => request.email === this.loggedUser);
        // console.log(this.bloodRequests);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  navigateHome() {
    if (this.loggedUser === 'sachinadmin@gmail.com') {
      this._router.navigate(['/loginsucess']);
    } else {
      this._router.navigate(['userdashboard']);
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

}

