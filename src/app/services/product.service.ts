import { Injectable } from '@angular/core';
import {Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc,getDoc, getDocs, query, orderBy, limit, DocumentData} from '@angular/fire/firestore'
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products?: Observable<any[]>;
  popularProducts?: Observable<any[]>;


  constructor(private firestore: Firestore) {

  }


  create(product){
    const collectionInstance=collection(this.firestore,'/products');
    addDoc(collectionInstance, product).then(()=>{
      console.log("Data saved successfully");
    }).catch((err)=>{
      console.log(err);
    }
    );

  }

  getAll(): Observable<any[]>{
    const collectionInstance=collection(this.firestore,'/products');
    this.products=collectionData(collectionInstance, { idField: 'key'});
    return this.products;
  }

  async get(productId){
  const docRef = doc(this.firestore, '/products', productId);

  try {
    const productInfo = await getDoc(docRef);
    return productInfo.data();
  } catch (error) {
    console.error('Error getting document:', error);
    throw error; // Propagate the error to the caller
  }
}

  update(productId,product){

    const docInstance=doc(this.firestore,'/products',productId);
    updateDoc(docInstance,product).then(()=>{
      console.log('Data updated successfully');
    }).catch((err)=>{
      console.log(err);
    });
  }

  delete(productId){
    const docInstance=doc(this.firestore,'products',productId);
    deleteDoc(docInstance).then(()=>{
      console.log('Data deleted successfully');
    }).catch((err)=>{
      console.log(err);
    });
  }

    async getFirst10Documents(): Promise<{ id: string, data: DocumentData }[]> {
      const collectionRef = collection(this.firestore, 'products');
      const q = query(collectionRef, limit(10));

      const querySnapshot = await getDocs(q);

      const documents: { id: string, data: any }[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, data: doc.data() });
      });

      return documents;
    }

  async getFirst5Documents(): Promise<any[]> {
      const collectionRef = collection(this.firestore, 'products');
      const q = query(collectionRef, limit(5));

      const querySnapshot = await getDocs(q);

      const documents: { id: string, data: any }[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, data: doc.data() });
      });

      return documents;
  }


}

