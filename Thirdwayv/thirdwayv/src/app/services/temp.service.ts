import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { RestEndpoints } from '../enums/rest-endpoints.enum';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private apiService:ApiService) { }

  addTemp(tempList:any){
    var body={
     devices:tempList
    };
    return this.apiService.post(RestEndpoints.ADD_TEMP,body).pipe(
      map((result: any) => {
        console.log("calling endpoint: ",RestEndpoints.ADD_TEMP,'\nbody request: ',body,'\nresponse: ',result)
        return result;
      }));
  }

  getTempsByDevId(devId:number){
    var body={
     deviceId:devId
    };
    return this.apiService.post(RestEndpoints.GET_TEMPS_BY_DEV_ID,body).pipe(
      map((result: any) => {
        console.log("calling endpoint: ",RestEndpoints.GET_TEMPS_BY_DEV_ID,'\nbody request: ',body,'\nresponse: ',result)
        return result;
      }));
  }

  getAllDevs(){
    return this.apiService.get(RestEndpoints.GET_ALL_DEVICES).pipe(
      map((result: any) => {
        console.log("calling endpoint: ",RestEndpoints.GET_ALL_DEVICES,'\nbody request: ','\nresponse: ',result)
        return result;
      }));
  }
}
