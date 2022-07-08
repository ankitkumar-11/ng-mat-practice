import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// --------------------------------------------------------------------------------------
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
// --------------------------------------------------------------------------------------
import { environment } from 'src/environments/environment';
// --------------------------------------------------------------------------------------
import { AdmissionDetail } from './model/admission-details.model';

@Injectable()
export class AdmissionService {

  private apiBaseLink: string;
  constructor(private _http: HttpClient) {
    this.apiBaseLink = environment.baseURL;
  }

  /**
   * @name getPostalAddress
   * @description get postal office by pincode
   * @param pinCode : number
   * @returns Observable<any> - array of postal office
   */
  public getPostalAddress(pinCode: number): Observable<any> {
    return this._http.get<any>(`https://api.postalpincode.in/pincode/${pinCode}`).pipe(
      map(res => res[0].PostOffice),
    )
  }
  
  /**
   * @name getAllAdmissions
   * @description get all admission data from db
   * @returns Observable<AdmissionDetail>
   */
  public getAllAdmissions(): Observable<AdmissionDetail[]> {
    return this._http.get<AdmissionDetail[]>(`${this.apiBaseLink}admission`)
  }

  /**
   * @name addNewAdmission
   * @description add new admission data to db
   * @param data : AdmissionDetail
   * @returns Observable<AdmissionDetail>
   */
  public addNewAdmission(data: AdmissionDetail): Observable<AdmissionDetail> {
    return this._http.post<AdmissionDetail>(`${this.apiBaseLink}admission`, data)
  }

  /**
   * @name addNewAdmission
   * @description Update admission data to db
   * @param data : AdmissionDetail
   * @param id : string
   * @returns Observable<AdmissionDetail>
   */
  public updateAdmission(data: AdmissionDetail, id: string): Observable<AdmissionDetail> {
    return this._http.put<AdmissionDetail>(`${this.apiBaseLink}admission/${id}`, data)
  }


  /**
   * @name removeAdmissions
   * @description remove admission data from db by id
   * @returns Observable<AdmissionDetail>
   */
   public removeAdmissions(id:string): Observable<AdmissionDetail> {
    return this._http.delete<AdmissionDetail>(`${this.apiBaseLink}admission/${id}`)
  }

}
