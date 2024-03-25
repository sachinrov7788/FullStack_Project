import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donors } from '../model/Donors';
import { BloodRequest } from '../model/BloodRequest';
import { User } from '../model/User';
import { BloodDetails } from '../model/BloodDetails';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private NAV_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  public getDonorList(pageIndex: number, pageSize: number): Observable<any> {
    const param = new HttpParams().set("pageIndex", pageIndex).set("pageSize", pageSize);
    return this._http.get<Donors>(`${this.NAV_URL}/donor/getTotalDonors`, { params: param });
  }

  public getRequestHistoryByEmail(loggedUser: string): Observable<any> {
    return this._http.get<BloodRequest>(`${this.NAV_URL}/blood-requests/getTotalRequest/` + loggedUser);
  }

  public getRequestHistory(): Observable<any> {
    return this._http.get<BloodRequest>(`${this.NAV_URL}/blood-requests/getTotalRequests`);
  }

  public getUserList(): Observable<User> {
    return this._http.get<User>(`${this.NAV_URL}/users/getTotalUsers`);
  }

  public addDonorFromRemote(donor: Donors): Observable<Donors> {
    return this._http.post<Donors>(`${this.NAV_URL}/donor/addDonor`, donor);
  }

  public requestForBlood(request: BloodRequest): Observable<BloodRequest> {
    return this._http.post<BloodRequest>(`${this.NAV_URL}/blood-requests`, request);
  }

  public requestForAddingDonor(donor: Donors): Observable<Donors> {
    return this._http.post<Donors>(`${this.NAV_URL}/donor/addDonor`, donor);
  }

  public getBloodDetails(): Observable<any> {
    return this._http.get<BloodDetails>(`${this.NAV_URL}/blood-details/getTotalBloodGroups`);
  }

  public getProfileDetails(loggedUser: string): Observable<User> {
    return this._http.get<User>(`${this.NAV_URL}/users/getUserByEmail/` + loggedUser);
  }

  public UpdateUserProfile(user: User): Observable<User> {
    return this._http.put<User>(`${this.NAV_URL}/users/profile/${user.email}`, user);
  }

  public acceptRequestForBlood(id: string): Observable<BloodRequest[]> {
    return this._http.put<BloodRequest[]>(`${this.NAV_URL}/blood-requests/accept/${id}`, {});
  }

  public rejectRequestForBlood(id: string): Observable<BloodRequest[]> {
    return this._http.put<BloodRequest[]>(`${this.NAV_URL}/blood-requests/reject/${id}`, {});
  }

  public getTotalDonors(): Observable<any> {
    return this._http.get(`${this.NAV_URL}/donor/getTotalDonors`);
  }

  public getTotalUsers(): Observable<any> {
    return this._http.get(`${this.NAV_URL}/users/getTotalUsers`);
  }

  public getTotalBloodGroups(): Observable<any> {
    return this._http.get(`${this.NAV_URL}/blood-details/getTotalBloodGroups`);
  }

  public  getTotalUnits(): Observable<any> {
    return this._http.get(`${this.NAV_URL}/blood-details/getTotalBloodGroups`);
  }

  public getTotalRequests(): Observable<any> {
    return this._http.get(`${this.NAV_URL}/blood-requests/getTotalRequests`);
  }
}
