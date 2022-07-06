import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdmissionService } from '../admission.service';

@Component({
  selector: 'app-admission-form-container',
  templateUrl: './admission-form-container.component.html',
  styleUrls: ['./admission-form-container.component.scss']
})
export class AdmissionFormContainerComponent implements OnInit {

  public arrayofCity: any = [];
  public country: any;
  public state: any;

  public arrayOfCity$: Subject<any>;
  public state$: Subject<any>;
  public country$: Subject<any>;
  constructor(private _service: AdmissionService) {
    this.arrayOfCity$ = new Subject<any>()
    this.state$ = new Subject<any>()
    this.country$ = new Subject<any>()
  }

  ngOnInit(): void {
   
  }

  public onPinCode(pincode:number){
    console.log('onInit')
    this._service.getPostalAddress(pincode).subscribe((res: any) => {
      res.forEach((el: any) => {
        this.arrayofCity.push(el.Name)
        this.country = el.Country;
        this.state = el.State;
      })
      this.arrayOfCity$.next(this.arrayofCity);
      this.country$.next(this.country);
      this.state$.next(this.state)
    })
  }

}
