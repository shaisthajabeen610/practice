import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreeapiService {
  
  parameter:any;
  constructor( private httpclient:HttpClient) { 
    
  } 
  // getdata(){
 
  //   return this.http
  // }
  getData(params: { currencyCode: any; unitOfMeasure: any; serviceName: any; productName: any;  }):Observable<any>{
    
    return this.httpclient.get('http://localhost:64299/api/retail/prices?currencyCode='+params.currencyCode+'&$filter=unitofMeasure eq \''+params.unitOfMeasure+'\' and serviceName eq \''+params.serviceName+'\' and productName eq \''+params.productName+'\'')
  }
  // currencyCode='USD'&$filter= unitOfMeasure eq '1 Hour'
  //   and location eq 'US West' and serviceName eq 'Virtual Machines' and productName eq 'Virtual Machines FSv2 Series Windows'      
}
