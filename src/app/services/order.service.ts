import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';
import { Order } from '../model/order.model';
import { CaddyService } from './caddy.service';
import { CatalogueService } from './catalogue.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order=new Order();

  constructor(private caddyService:CaddyService, private catService:CatalogueService
    , private http:HttpClient) { }

    public setClient(client:Client){
      this.order.client=client;
    }

    public loadProductsFromCaddy(){
      this.order.products=[];
      for(let key in this.caddyService.getCaddy().items){
        this.order.products.push(this.caddyService.getCaddy().items[key]);
      }
    }

    public getTotal():number{
      let total:number=0;
      this.order.products.forEach(p=>{
        total+=p.price*p.quantity;
      });
      return total;
    }

    public submitOrder(){
      return this.http.post(this.catService.host+"/orders",this.order);
    }

    public getOrder(id:number):Observable<Order>{
      return this.http.get<Order>(this.catService.host+"/orders/"+id);
    }
}
