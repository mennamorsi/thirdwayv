import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.API_URL;

  constructor(private httpClient:HttpClient) { }

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient
      .get(this.baseUrl + path, { params })
  }

  public put(path: string, body: any = {}): Observable<any> {
    return this.httpClient
      .put(this.baseUrl + path, body)
  }

  public post(path: string, body: any = {}, httpHeaders?: [{ key: any, value: any }]): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    if (httpHeaders) {
      httpHeaders.forEach((header) => {
        headers.append(header.key, header.value);
      });
    }
    return this.httpClient
      .post(this.baseUrl + path, body, { headers })
  }

  public delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient
      .delete(this.baseUrl + path, { params })
  }

}
