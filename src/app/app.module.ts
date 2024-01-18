import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { EditProductFormComponent } from './admin/edit-product-form/edit-product-form.component';
import { LoginComponent } from './login/login.component';
import { MdComponentsModule } from './md-components/md-components.module';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AuthgaurdService } from './services/authgaurd.service';
import { SearchService } from 'services/search.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from 'services/product.service';
import { ProductStorageService } from 'services/product-storage.service';
import { CompanyNameService } from 'services/company-name.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSpecService } from 'services/product-spec.service';
import { FacebookChatComponent } from './facebook-chat/facebook-chat.component';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    AdminProductsComponent,
    ProductFormComponent,
    EditProductFormComponent,
    LoginComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    FacebookChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'products',component: ProductsComponent},
      {path:'details/:id', component:ProductDetailsComponent},
      {path:'login', component: LoginComponent},
      {path:'admin/products/new',component: ProductFormComponent,canActivate: [AuthgaurdService]},
      {path:'admin/products/:id',component: EditProductFormComponent, canActivate: [AuthgaurdService]},
      {path:'admin/products',component: AdminProductsComponent, canActivate: [AuthgaurdService]},

    ]),


    AppRoutingModule,
    MdComponentsModule,
    NgbPaginationModule,

    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp({"projectId":"project-3-selling-phone-web","appId":"1:784218361683:web:887b6c1063f6d1eb7f9ba6","storageBucket":"project-3-selling-phone-web.appspot.com","apiKey":"AIzaSyBejun7B9t1MHrbOuJHe8t6C8Ky6pfR2R0","authDomain":"project-3-selling-phone-web.firebaseapp.com","messagingSenderId":"784218361683","measurementId":"G-XG9DCX220X"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,

    NgbModule,
    HotToastModule.forRoot(),

  ],
  providers: [AuthenticationService,AuthgaurdService,SearchService,ProductService,ProductStorageService,CompanyNameService,ProductSpecService],
  bootstrap: [AppComponent]
})
export class AppModule { }
