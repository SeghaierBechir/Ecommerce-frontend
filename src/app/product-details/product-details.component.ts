import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  public currentProduct:Product
  public editPhoto:boolean;
  public selectedFile;
  public progress:number;
  public currentFileUpload;
  public timestampe:number=0
  public title:string;
  public promotion;
  public selected;
  public available;
  public mode:number=0;

  constructor(private router:Router,private route:ActivatedRoute,
    public catService:CatalogueService,public authService:AuthenticationService,
    private caddyService:CaddyService) { }

  ngOnInit(): void {
    let url=atob(this.route.snapshot.params.url)
    this.catService.getProduct(url)
    .subscribe(data=>{
      this.currentProduct=data;
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

  onEditProduct(){
    this.mode=1
  }

  onUpdateProduct(data){
    let url=this.currentProduct._links.self.href;
    this.catService.patchResource(url,data)
    .subscribe(d=>{
      this.currentProduct=d;
      this.mode=0;
    },err=>{
      console.log(err);
    })
  }
  //onEditPhoto(){}
  //onSelectedFile(){}
  //onUploadPhoto(){}

  onAddProductToCaddy(p:Product){
    if(!this.authService.isAuthenticated){
      this.router.navigateByUrl('/login')
    }else {
      this.caddyService.addProduct(p);
    }
  }

}
