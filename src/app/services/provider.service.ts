import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private urlProvider: string = "https://localhost:7202/api/Providers"
  

  constructor(private http:HttpClient, private router:Router){}

  public getProvider(): Observable<any>{    
    
    return this.http.get(this.urlProvider).pipe(res =>res);
  }

  public addProvider(fullName:string, addres:string){
    return this.http.post(this.urlProvider, {
      fullName, addres
    }).pipe(tap(()=>{
      this.router.navigateByUrl('/', {skipLocationChange:true}).then(()=>{
        this.router.navigate(['/providers']);
      })
    }));

  }
}
