import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';
import { CatalogueService } from './services/catalogue.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public categories;
  public currentCategory;
  constructor(private catService:CatalogueService,private router:Router,
    public authService:AuthenticationService,public caddyService:CaddyService){}
  title = 'P2Ecommerce';
  ngOnInit(){
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  getCategories(){
    this.catService.getResource("/categories")
    .subscribe(data=>{
      this.categories=data;
    },err=>{
      console.log(err);
    })
  }

  getProductsByCategory(c){
    this.currentCategory=c;
    this.router.navigateByUrl('/products/2/'+c.id);
  }

  onSelectedProducts(){
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo(){
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo(){
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }

  onLogOut(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
