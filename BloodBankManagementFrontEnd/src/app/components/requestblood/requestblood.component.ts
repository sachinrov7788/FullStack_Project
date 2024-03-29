import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BloodRequest } from 'src/app/model/BloodRequest'; // Make sure to import BloodRequest
import { DonorService } from 'src/app/services/donor.service';

@Component({
    selector: 'app-requestblood',
    templateUrl: './requestblood.component.html',
    styleUrls: ['./requestblood.component.scss']
})
export class RequestbloodComponent implements OnInit {

    loggedUser = '';
    tempUser = '';
    request = new BloodRequest('', '', '', 'O+ve', 1, '', '', 'Male', 0, '');
    msg = '';

    constructor(private _router: Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
        if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
            this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
        }
        this.loggedUser = this.tempUser;
        this.msg = '';
    }

    navigateHome() {
        this._router.navigate(['/userdashboard']);
    }

    requestBlood() {
        this.donorService.requestForBlood(this.request).subscribe(
            data => {
                console.log("Request sent Successfully");
                this.msg = "Blood Request Sent Successfully!!!";
                this._router.navigate(['/userdashboard']);
            },
            error => {
                console.log("request Failed");
                console.log(error.error);
            }
        )
    }

    logout() {
        sessionStorage.clear();
        this._router.navigate(['/login']);
    }
}
