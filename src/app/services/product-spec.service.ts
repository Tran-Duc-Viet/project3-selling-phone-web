import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const API_URL='https://mobile-phone-specs-database.p.rapidapi.com/gsm/get-specifications-by-brandname-modelname';

@Injectable({
  providedIn: 'root'
})
export class ProductSpecService {

  constructor(private HttpClient: HttpClient) { }

  //get Product specification details from Rapid API by Brand and Product Name
  getProductSpec(brand,productName):Observable<any[]>{
    let headers=new HttpHeaders().set('x-rapidapi-key','885032ebb9msh8b4ac3f6381115ep18243bjsn3d6221c022b4')
    .set('x-rapidapi-host','mobile-phone-specs-database.p.rapidapi.com')
    let productName1=productName.replace(' ','%20')
    let url='https://mobile-phone-specs-database.p.rapidapi.com/gsm/get-specifications-by-brandname-modelname/'+brand+'/'+productName1;
    console.log(url);
    return this.HttpClient.get<any[]>(url,{headers});
  }
}

