import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Temp } from 'src/app/models/temp.model';

@Component({
  selector: 'app-device-details-table',
  templateUrl: './device-details-table.component.html',
  styleUrls: ['./device-details-table.component.css']
})
export class DeviceDetailsTableComponent implements OnInit {
  dataSource: MatTableDataSource<Temp>;
  displayedColumns: string[] = ['tempValue','createdAt'];
  @Input() deviceDetails: Temp[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.deviceDetails=changes['deviceDetails'].currentValue;
    this.dataSource=new MatTableDataSource(this.deviceDetails);

  }

}
