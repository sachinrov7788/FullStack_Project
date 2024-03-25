import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Donors } from 'src/app/model/Donors';
import { DonorService } from 'src/app/services/donor.service';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-donorlist',
  templateUrl: './donorlist.component.html',
  styleUrls: ['./donorlist.component.scss']
})
export class DonorlistComponent implements OnInit, AfterViewInit {

  loggedUser = '';
  tempUser = '';
  title = '';
  bloodGroup!: '';
  msg: boolean = false;
  donors: Donors[] = [];
  length = 0;
  pageSize = 3;
  pageIndex = 0;

  hidePageSize = false;
  showPageSizeOptions = false;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;



  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private donorService: DonorService, private activatedRoute: ActivatedRoute, private _router: Router, private cdrf: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser') || '{}');
    if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length - 1) === '"') {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;

    // this.reloadData(this.pageIndex, this.pageSize);

    if (this.loggedUser === "sachinadmin@gmail.com") {
      this.title = "Admin Dashboard";
    }
    else {
      this.title = "User Dashboard";
    }
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe((data) => {
      this.reloadData(data.pageIndex, data.pageSize);
    });
    this.reloadData(this.pageIndex, this.pageSize);
    this.cdrf.detectChanges();
  }

  handlePageEvent(e: PageEvent) {
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
    this.reloadData(e.pageIndex, e.pageSize);
  }

  reloadData(pageIndex: number, pageSize: number) {
    this.donorService.getDonorList(pageIndex, pageSize).subscribe({
      next: data => {
        // this.donors = data;
        // this.length = this.donors.length;
        // const startIndex = this.pageIndex * this.pageSize;
        // const endIndex = this.pageIndex * this.pageSize + this.pageSize;
        this.paginator.length = data.totalElements;
        this.paginator.pageIndex = data.number;
        this.paginator.pageSize = data.size;
        this.donors = data.content;
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
      this.reloadData(0, 6);
      this.msg = false;
    } else {
      this.donorService.getDonorList(0, 6).subscribe({
        next: data => {
          this.donors = data.content.filter((donor: Donors) => donor.bloodGroup.toLowerCase().includes(this.bloodGroup.toLowerCase()));
          this.msg = this.donors.length === 0;
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }
}
