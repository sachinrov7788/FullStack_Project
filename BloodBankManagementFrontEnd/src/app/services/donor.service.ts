import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private NAV_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  public getDonorList(): Observable<any> {
    return this._http.get<any>(`${this.NAV_URL}/donor/getTotalDonors`);
  }

  public getRequestHistoryByEmail(loggedUser: string): Observable<any> {
    return this._http.get<any>(`${this.NAV_URL}/blood-requests/getTotalRequest/` + loggedUser);
  }

  public getRequestHistory(): Observable<any> {
    return this._http.get<any>(`${this.NAV_URL}/blood-requests/getTotalRequests`);
  }

  public getUserList(): Observable<any> {
    return this._http.get<any>(`${this.NAV_URL}/users/getTotalUsers`);
  }

  public addDonorFromRemote(donor: any): Observable<any> {
    return this._http.post<any>(`${this.NAV_URL}/donor/addDonor`, donor);
  }

  public requestForBlood(request: any): Observable<any> {
    return this._http.post<any>(`${this.NAV_URL}/blood-requests`, request);
  }

  public requestForAddingDonor(donor: any): Observable<any> {
    return this._http.post<any>(`${this.NAV_URL}/donor/addDonor`, donor);
  }

  public getBloodDetails(): Observable<any> {
    return this._http.get<any>(`${this.NAV_URL}/blood-details/getTotalBloodGroups`);
  }

  public getProfileDetails(loggedUser: string): Observable<any> {
    return this._http.get<any>(`${this.NAV_URL}/users/getUserByEmail/` + loggedUser);
  }

  public UpdateUserProfile(user: any): Observable<any> {
    return this._http.put<any>(`${this.NAV_URL}/users/profile/${user.email}`, user);
  }

  public acceptRequestForBlood(id: string): Observable<any[]> {
    return this._http.put<any[]>(`${this.NAV_URL}/blood-requests/accept/${id}`, {});
  }

  public rejectRequestForBlood(id: string): Observable<any[]> {
    return this._http.put<any[]>(`${this.NAV_URL}/blood-requests/reject/${id}`, {});
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

  public getTotalDonationCount(loggedUser: string): Observable<any> {
    return this._http.get(`${this.NAV_URL}/blood-requests/getTotalRequest/` + loggedUser);
  }
}
