import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { AdmissionDetail } from './model/admission-details.model';

@Injectable()
export class AdmissionService {

  private apiBaseLink: string;
  constructor(private _http: HttpClient) {
    this.apiBaseLink = environment.baseURL;
  }

  public getPostalAddress(pinCode: number): Observable<any> {
    return this._http.get<any>(`https://api.postalpincode.in/pincode/${pinCode}`).pipe(
      map(res => res[0].PostOffice),
    )
  }

  public addNewAdmission(data: AdmissionDetail): Observable<AdmissionDetail> {
    return this._http.post<AdmissionDetail>(`${this.apiBaseLink}admission`, data)
  }

}
