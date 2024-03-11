import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { User } from 'src/app/model/User';
import { DonorService } from 'src/app/services/donor.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  loggedUser = '';
  tempUser = '';
  temp = false;
  profileDetails: any = {};
  user: User = new User('', '', '', '', 0, Role.USER, '', '');
  msg = '';
  profileFormVisible = false;

  constructor(private donorService: DonorService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.tempUser = sessionStorage.getItem('loggedUser') || '';
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;
    this.getProfileDetails(this.loggedUser);
  }

  editProfile(): void {
    this.profileFormVisible = true;
  }

  getProfileDetails(loggedUser: string): void {
    this.donorService.getProfileDetails(loggedUser).subscribe({
      next: data => {
        this.profileDetails = data;
        console.log(this.profileDetails);
      },
      error: error => {
        console.error(error);
      }
    });
  }

  updateUserProfile(): void {
    this.donorService.UpdateUserProfile(this.user).subscribe(
      data => {
        console.log("UserProfile Updated successfully");
        this.profileDetails = data;
        this.temp = true;
        this.profileFormVisible = false;
        setTimeout(() => {
          this.router.navigate(['/userdashboard']);
        }, 6000);
      },
      error => {
        this.msg = "Profile Updation Failed !!!";
        console.log("Profile Updation Failed");
        console.error(error);
      }
    );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
