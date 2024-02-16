import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private urlshopping: string = "https://localhost:7202/api/Shopping"
  

  constructor(private http:HttpClient, private router:Router){}

  public getShopping(): Observable<any>{       
    return this.http.get(this.urlshopping).pipe(res =>res);
  }
  
  public reloaded():void{
    this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{
      this.router.navigate(['/shopping']);
    })


  }
  public addShopping(providerId:number, productId:number, 
    document:string, amount:number, price:number, created:Date){
    return this.http.post(this.urlshopping, {
      providerId, productId, document, amount, price, created
    }).pipe(tap(()=>{
      this.reloaded()
    }));

  }

  public editShopping(id:number,providerId:number, productId:number, 
    document:string, amount:number, price:number, created:Date){       
      return this.http.put(this.urlshopping +`/${id}`,{
        providerId, productId, document, amount, price, created
      })
    }

  public deleteShopping(id:number){
    return this.http.delete(this.urlshopping +`/${id}`)
  }
  
}
