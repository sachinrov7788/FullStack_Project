import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  users: Observable<any[]> | undefined;
  isAdmin = false;

  constructor(private _router: Router, private donorService: DonorService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.tempUser = sessionStorage.getItem('loggedUser') || '';
    this.isAdmin = this.tempUser === 'sachinadmin@gmail.com';
    console.log('Is Admin:', this.isAdmin);
    this.loggedUser = this.tempUser;
    this.reloadData();
  }

  reloadData() {
    this.users = this.isAdmin ? this.donorService.getTotalUsers() : this.donorService.getUserList();
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
