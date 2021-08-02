import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import {ItemProduct} from '../model/item-product.model'
import { Caddy } from '../model/caddy.model';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {
  public caddy:Caddy

  constructor(public caddyService:CaddyService,private authService:AuthenticationService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    if(!this.authService.isAuthenticated){
      this.router.navigateByUrl('/login')
      this.caddy=this.caddyService.getCaddy();
      console.log(this.caddy);
    }
  }

  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
  }

  getTotal() {
      return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }

  onAddCaddy() {

    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCaddy();
  }

}
