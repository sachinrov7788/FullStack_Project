import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BloodDetails } from 'src/app/model/BloodDetails';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.scss']
})
export class LoginsuccessComponent {

  loggedUser: any;
  tempUser = '';
  bloodDetails!: any[];

  constructor(private _router: Router, private donorService: DonorService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;

    this.getBloodDetails();
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

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
