import { Injectable } from '@angular/core';
import {Firestore, collection, collectionData} from '@angular/fire/firestore'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductStorageService {
  storage!: Observable<any>;

  constructor(private firestore: Firestore) {

   }
  getStorage(): Observable<any[]>{
    const collectionInstance=collection(this.firestore,'Storage');
    this.storage=collectionData(collectionInstance);
    return this.storage;

  }
}
