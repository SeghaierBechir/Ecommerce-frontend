import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  public editPhoto:boolean;
  public currentProduct;
  public selectedFile;
  public progress:number;
  public currentFileUpload;
  public timestampe:number=0
  public title:string;
  public promotion;
  public selected;
  public available;

  constructor(public catService:CatalogueService, private route:ActivatedRoute,
    private router:Router,public authService:AuthenticationService,
    private caddyService:CaddyService) { }

  ngOnInit(): void {
    this.router.events.subscribe(val=>{
      if(val instanceof NavigationEnd){
        let url=val.url
        console.log(url)
        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.title="Selection"
         this.getProducts('/products/search/selectedProducts');
       }

        else if(p1==2){
         let idCat=this.route.snapshot.params.p2
         this.title="products of category "+idCat;
         this.getProducts('/categories/'+idCat+'/products')
       }

        else if(p1==3){
         this.title="Product Promotion"
         this.getProducts('/products/search/promoProducts');
        }

        else if(p1==4){
          this.title="Product Available"
          this.getProducts('/products/search/dispoProducts');
        }
        else if(p1==5){
          this.title="Search ..."
          this.getProducts('/products/search/dispoProducts');
        }
      }
    });

    let p1=this.route.snapshot.params.p1;
        if(p1==1){
         this.getProducts('/products/search/selectedProducts');
       }


  }

  getProducts(url){
    this.catService.getResource(url)
    .subscribe(data=>{
      this.products=data;
    },err=>{
      console.log(err);
    })
  }

  onEditPhoto(p){
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event){
    this.selectedFile=event.target.files
  }

  onUploadPhoto(){
    this.progress=0;
    this.currentFileUpload=this.selectedFile.item(0);
    this.catService.uploadPhotoProduct(this.currentFileUpload,this.currentProduct.id)
    .subscribe(event=>{
      if(event.type==HttpEventType.UploadProgress){
        this.progress=Math.round(100 * event.loaded / event.total)
      }
      else if(event instanceof HttpResponse){
        this.timestampe=Date.now();
      }
    },err=>{
      alert('Probléme de chargement'+JSON.parse(err.error).message)
    });
    this.selectedFile=undefined
  }

  getTS(){
    return this.timestampe;
  }

  onProductsdetails(p:Product){
    let url=btoa(p._links.product.href)
    this.router.navigateByUrl('/product-details/'+url)
  }

  onAddProductToCaddy(p:Product){
    if(!this.authService.isAuthenticated){
      this.router.navigateByUrl('/login')
    }else {
      this.caddyService.addProduct(p);
    }
  }

  isAdmin(){
    return this.authService.isAdmin();
  }

}
