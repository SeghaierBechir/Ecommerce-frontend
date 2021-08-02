import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaddiesComponent } from './caddies/caddies.component';
import { ClientComponent } from './client/client.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path:'products/:p1/:p2',component:ProductsComponent
  },
  {
    path:'',redirectTo:'products/1/0',pathMatch:'full'
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'product-details/:url',component:ProductDetailsComponent
  },
  {
    path:'caddies',component:CaddiesComponent
  },
  {
    path:'client',component:ClientComponent
  },
  {
    path:'payment/:orderID',component:PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
