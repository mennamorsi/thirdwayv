import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { DeviceDetailsTableComponent } from './device-details-table/device-details-table.component'


@NgModule({
  declarations: [
    DeviceDetailsTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
 exports:  [
  CommonModule,
  DeviceDetailsTableComponent
 ]
})
export class SharedModule { }
