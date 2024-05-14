import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppService } from '../app.service';
import { visitors_Data } from '../app.model';

@Component({
  selector: 'app-visitors',
  templateUrl: './visitors.component.html',
  styleUrls: ['./visitors.component.css']
})
export class VisitorsComponent implements OnInit{

  visitosDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public visitorsDataSource : MatTableDataSource<any>
  public displayedColumns = [
    'id',
    'ip',
    'city',
    'region',
    'postal',
    'country',
    'createdOn',
  ];
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  public tempData: any;
  public visitorsData : any;

  constructor(public appSrvc : AppService){
    this.visitorsDataSource = new MatTableDataSource(this.visitorsData);
  }

  ngOnInit(): void {
    this.getVisitorDetails();
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.visitosDateRange.controls['start'].value;
    const toDate = this.visitosDateRange.controls['end'].value;
    this.tempData = this.visitorsData;
    let selectedItems: visitors_Data[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: visitors_Data) => {
        if (
          new Date(item.date) >= new Date(fromDate) &&
          new Date(item.date) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.visitorsDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.visitosDateRange.reset();
    this.visitorsDataSource.data = this.visitorsData;
  }

  // Search
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.visitorsDataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.visitorsDataSource.paginator = this.paginator;
    this.visitorsDataSource.sort = this.sort;
  }

  public getVisitorDetails(){
    this.appSrvc.getVisitorsDetails().subscribe((res:any)=>{
      this.visitorsData = res;
      this.visitorsDataSource = new MatTableDataSource(this.visitorsData);
      this.visitorsDataSource.paginator = this.paginator;
      this.visitorsDataSource.sort = this.sort;
    })
  }

  //On clicking Export button, exporting to excel
  public ExportTOExcel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: ['Id', 'Name', 'MailID', 'About', 'Question', 'created On']
    };
    const exportData = this.visitorsDataSource.data.map((data) => {
      return {
        id: data.id,
        name: data.name,
        mailID: data.mailID,
        questions_Type: data.questions_Type,
        yourMessage: data.yourMessage,
        createdOn: data.createdOn
      }
    });
    // new ngxCsv(exportData, 'contactUsDetailsReport', options);
  }
}
