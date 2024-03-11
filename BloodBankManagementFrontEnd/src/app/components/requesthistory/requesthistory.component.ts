import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloodRequest } from 'src/app/model/BloodRequest';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-requesthistory',
  templateUrl: './requesthistory.component.html',
  styleUrls: ['./requesthistory.component.scss']
})
export class RequesthistoryComponent implements OnInit {
  loggedUser: string = '';
  title: string = '';
  requests: any[] = [];
  responses: any;

  constructor(private router: Router, private donorService: DonorService) { }

  ngOnInit(): void {
    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.title = this.loggedUser === 'sachinadmin@gmail.com' ? 'Admin Dashboard' : 'User Dashboard';
    this.reloadData();
  }

  navigateHome() {
    const route = this.loggedUser === 'sachinadmin@gmail.com' ? '/loginsuccess' : '/userdashboard';
    this.router.navigate([route]);
  }

  reloadData() {
    const requestObservable = this.loggedUser === 'sachinadmin@gmail.com' ?
      this.donorService.getRequestHistory() :
      this.donorService.getRequestHistoryByEmail(this.loggedUser);

    requestObservable.subscribe({
      next: (data: BloodRequest[]) => {
        this.requests = data;
      },
      error: error => {
        console.error('Error fetching blood requests: ', error);
      }
    });
  }

  acceptRequest(curremail: string) {
    this.donorService.acceptRequestForBlood(curremail).subscribe({
      next: data => {
        this.responses = data;
        this.hideButtons();
      },
      error: error => {
        console.error('Error accepting blood request: ', error);
      }
    });
  }

  rejectRequest(curremail: string) {
    this.donorService.rejectRequestForBlood(curremail).subscribe({
      next: data => {
        this.responses = data;
        this.hideButtons();
      },
      error: error => {
        console.error('Error rejecting blood request: ', error);
      }
    });
  }

  hideButtons() {
    const acceptButton = document.getElementById('acceptbtn');
    const rejectButton = document.getElementById('rejectbtn');
    const acceptedButton = document.getElementById('acceptedbtn');
    const rejectedButton = document.getElementById('rejectedbtn');

    if (acceptButton) acceptButton.style.display = 'none';
    if (rejectButton) rejectButton.style.display = 'none';
    if (acceptedButton) acceptedButton.style.display = 'block';
    if (rejectedButton) rejectedButton.style.display = 'block';
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
