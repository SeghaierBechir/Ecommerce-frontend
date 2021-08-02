import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../model/order.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public paymentAmount:number;
  public currentOrder:Order;
  mode:number=0

  constructor(private orderService:OrderService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params.orderID
    this.orderService.getOrder(id).subscribe(data=>{
      this.currentOrder=data;
    },err=>{
      console.log(err);
    })
  }

  onParOrder(data) {
    console.log(data);
  }

}
