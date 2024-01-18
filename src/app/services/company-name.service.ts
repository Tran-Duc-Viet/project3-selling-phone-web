import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData} from '@angular/fire/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyNameService {

  companyNames!: Observable<any>;

  constructor(private firestore: Firestore) {

   }
  getCompanyNames(): Observable<any[]>{
    const collectionInstance=collection(this.firestore,'CompanyName');
    this.companyNames=collectionData(collectionInstance);
    return this.companyNames;

  }
}
