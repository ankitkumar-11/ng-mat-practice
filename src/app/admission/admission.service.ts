import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, mergeMap, Observable } from 'rxjs';

@Injectable()
export class AdmissionService {

  constructor(private _http: HttpClient) { }

  public getPostalAddress(pinCode: number): Observable<any> {
    return this._http.get<any>(`https://api.postalpincode.in/pincode/${pinCode}`).pipe(
      map(res => res[0].PostOffice),
    )
    // return this._http.get<any>(`https://api.postalpincode.in/pincode/396191`)
  }

}
