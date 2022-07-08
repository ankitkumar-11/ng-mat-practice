import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
//----------------------------------------------------------------------------------
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//----------------------------------------------------------------------------------
import { AdmissionUtilitiesService } from '../../admission-utilities.service';
//----------------------------------------------------------------------------------
import { GENDER } from 'src/app/shared/constants/constants';
//----------------------------------------------------------------------------------
import { AdmissionDetail } from '../../model/admission-details.model';

@Component({
  selector: 'app-admission-list-presentation',
  templateUrl: './admission-list-presentation.component.html',
  styleUrls: ['./admission-list-presentation.component.scss']
})
export class AdmissionListPresentationComponent implements OnInit {

  /**
   * @description Setter for admissionsList
   */
  @Input() public set admissionsList(admissionsList: AdmissionDetail[] | null) {
    if (admissionsList) {
      this._admissionsList = admissionsList;
      this.dataSource.data = this._admissionsList;
    }
  }
  public get admissionsList(): AdmissionDetail[] {
    return this._admissionsList;
  }

  @Output() newUserData: EventEmitter<AdmissionDetail>;
  @Output() editedData: EventEmitter<AdmissionDetail>;
  @Output() removeData: EventEmitter<AdmissionDetail>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private _admissionsList!: AdmissionDetail[];

  public dataSource: MatTableDataSource<AdmissionDetail>;

  public GENDER = GENDER;

  protected displayedColumns: string[] = ['position', 'fullname', 'email', 'phoneNo', 'gender', 'branch', 'city', 'action'];

  constructor(private _admissionUtilities: AdmissionUtilitiesService) {

    this.dataSource = new MatTableDataSource<AdmissionDetail>();

    this.newUserData = new EventEmitter<AdmissionDetail>();
    this.editedData = new EventEmitter<AdmissionDetail>();
    this.removeData = new EventEmitter<AdmissionDetail>();
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * @name applyFilter
   * @description apply filter to dataSource 
   * @param keyPressEvent :KeyboardEvent
   */
  public applyFilter(keyPressEvent: KeyboardEvent) {
    let value: string = (keyPressEvent.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  /**
  * @nmae openView
  * @description open admission view detail and if submit emit the data 
  * @param data AdmissionDetail
  * @return Observable<AdmissionDetail>
  */
  public openView(data: AdmissionDetail) {
    this._admissionUtilities.openAdmissionDetailView(data, 'list');
  }

  /**
   * @name edit
   * @description emit data to edit
   * @param data :AdmissionDetail
   */
  public edit(data: AdmissionDetail) {
    const ref = this._admissionUtilities.openEditForm(data)
    ref.componentInstance.editedData.subscribe((data: AdmissionDetail) => {
      this.editedData.emit(data)
      ref.close();
    })
  }

  /**
   * @name onDelete
   * @description emit data to delete
   * @param data :AdmissionDetail
   */
  public onDelete(data: AdmissionDetail) {
    this.removeData.emit(data)
  }

}
