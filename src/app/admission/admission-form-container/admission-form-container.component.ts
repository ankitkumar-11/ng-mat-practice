import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdmissionService } from '../admission.service';

interface Post {
  citys: string[],
  country: string,
  state: string;
}
@Component({
  selector: 'app-admission-form-container',
  templateUrl: './admission-form-container.component.html',
  styleUrls: ['./admission-form-container.component.scss']
})
export class AdmissionFormContainerComponent implements OnInit {

  public citys: string[]

  public obj: Subject<Post>

  constructor(private _service: AdmissionService) {
    this.citys = [];
    this.obj = new Subject<Post>();
  }

  ngOnInit(): void {
    this.obj.subscribe(res => console.log(res))
  }

  public onPinCode(pincode: number) {
    console.log('onInit')
    this._service.getPostalAddress(pincode).subscribe((res: any) => {
      this.citys = [];
      res.forEach((el: any) => {
        this.citys.push(el.Name)
      })
      this.obj.next({ citys: this.citys, country: res[0].Country, state: res[0].State })
    })
  }

}
