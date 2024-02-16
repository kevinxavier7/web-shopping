import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductService {  

  private urlProduct: string = "https://localhost:7202/api/Products"
  

  constructor(private http:HttpClient, private router:Router){}

  public getProduct(): Observable<any>{    
    
    return this.http.get(this.urlProduct).pipe(res =>res);
  }

  public addProduct(name:string, make:string){
    return this.http.post(this.urlProduct, {
      name, make
    }).pipe(tap(()=>{
      this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{
        this.router.navigate(['/products']);
      })
    }));

  }
  
}
