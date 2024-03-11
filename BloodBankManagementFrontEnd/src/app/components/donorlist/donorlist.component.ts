import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Donors } from 'src/app/model/Donors';
import { DonorService } from 'src/app/services/donor.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-donorlist',
  templateUrl: './donorlist.component.html',
  styleUrls: ['./donorlist.component.scss']
})
export class DonorlistComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  title = '';
  bloodGroup!: '';
  donors: Donors[] | undefined;

  constructor(private donorService: DonorService, private activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;

    this.reloadData();

    if (this.loggedUser === "sachinadmin@gmail.com") {
      this.title = "Admin Dashboard";
    }
    else {
      this.title = "User Dashboard";
    }
  }

  reloadData() {
    this.donorService.getDonorList().subscribe({
      next: data => {
        this.donors = data;
      },
      error: error => {
        console.error(error);
      }
    });
    console.log(this.donors);
  }

  navigateHome() {
    if (this.loggedUser === "sachinadmin@gmail.com") {
      this.title = "Admin Dashboard";
      this._router.navigate(['/loginsuccess']);
    }
    else {
      this.title = "User Dashboard";
      this._router.navigate(['/userdashboard']);
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }

  search() {
    if (!this.bloodGroup) {
      this.reloadData();
    } else {
      this.donorService.getDonorList().subscribe({
        next: data => {
          this.donors = data.filter((donor: Donors) => donor.bloodGroup.toLowerCase().includes(this.bloodGroup.toLowerCase()));
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }
}
