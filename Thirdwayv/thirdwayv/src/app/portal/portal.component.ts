import { ChangeDetectorRef, Component, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Device } from '../models/device.model';
import { Temp } from '../models/temp.model';
import { TempService } from '../services/temp.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  dataSource: MatTableDataSource<Device>;
  displayedColumns: string[] = ['deviceId', 'tempValue','details'];
  public sensorsTemps:string;
  public readingList:any[];
  public lastUpdatedDevices:Device[];
  public deviceDetails:Temp[];
  public selectedId:number;
  public errorMsg:string;
  public successMsg:string;

  constructor(private tempService:TempService,private changeDetector: ChangeDetectorRef) {
    this.sensorsTemps='';
    this.readingList=[];
    this.lastUpdatedDevices=[];
    this.selectedId=-1;
   }

  ngOnInit(): void { this.getAllDevs(); }
  getAllDevs(){
    this.tempService.getAllDevs().subscribe(result=>{
      if(result.data!=undefined){
        this.errorMsg='';
        this.lastUpdatedDevices = result.data.devices;
        this.dataSource=new MatTableDataSource(this.lastUpdatedDevices);
      }
    }, error=>{
      console.log("*******error getting devices*****");
     // this.errorMsg=`Error during getting all devices`;

    });

  }

  onEnter() { 
    this.errorMsg='';
    this.successMsg='';
    this.processTemps(); 
  }

  processTemps(){
    let sensorsTempsList = this.sensorsTemps.replace('0x','').split('');
    if( !sensorsTempsList.length||sensorsTempsList.length%10 != 0){
      this.errorMsg=`Invaled format`;
      return;
    }
    this.readingList=[];
    const devSize:number = 8;
    const tempSize:number = 2;
    let counter = sensorsTempsList.length / (devSize + tempSize);
    for(let i = 0; i<counter;i++){
      let start = i * (devSize + tempSize)
      let devId = parseInt(sensorsTempsList.slice(start, start + devSize ).join(''),16);
      let tempValue = parseInt(sensorsTempsList.slice(start + devSize , start + devSize + tempSize ).join(''),16);
      this.readingList.push(
        {
          deviceId:devId,
          temp: tempValue
        });
    }
    console.log("list to add",this.readingList);
    this.addTemps();
  }

 
  addTemps(){
    this.tempService.addTemp(this.readingList).subscribe(result=>{
      console.log("******* adding temps done successfully *****");
      this.successMsg=`Add new temps done successfully`;
      this.getAllDevs();
    }, err=>{
      console.log("*******error adding temps*****");
      this.successMsg=``;
      this.errorMsg=`Error during adding new readings`;
    })
  }

  getDeviceDetails(id:number){
    if(this.selectedId == id){
      this.deviceDetails=[];
      this.selectedId = -1;
      return;
    }
    this.selectedId=id;
    this.tempService.getTempsByDevId(id).subscribe(result=>{
      console.log("******* get device details successfully *****");
      if(result.data!=undefined){
      this.deviceDetails = result.data.temps;
      console.log("temps",this.deviceDetails);
      }
      
    }, err=>{
      console.log("*******error get device details*****");
      this.errorMsg=`Error during getting all tempratures for device id ${id}`;
    })
  }
 
}
