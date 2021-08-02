import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../model/client.model';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
   mode:number=0
   panelStyle:string= "panel-default";

  constructor(public orderService:OrderService,public caddyService:CaddyService,
    public authService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  onSaveClient(client:Client){
    client.username=this.authService.userAuthenticated.username;
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode=1;
  }

  onOrder(){
    this.orderService.submitOrder()
    .subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle="panel-success"
    },err=>{
      console.log(err)
    })
  }

  onPayOrder(){
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }

}
