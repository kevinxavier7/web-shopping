import { Component } from '@angular/core';
import { ProviderService } from '../../services/provider.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-provider',
  standalone: true,
  imports: [SidebarComponent, FormsModule],
  templateUrl: './provider.component.html',
  styleUrl: './provider.component.css'
})
export class ProviderComponent {

  providerList: any[] = [];
  nameProvider:string ='';
  addressProvider:string ='';   

  constructor(private providerservice:ProviderService ) { }

  mostrarModal:boolean = false;

  ngOnInit(): void {
    this.getProvider();
  }

  getProvider() {
    this.providerservice.getProvider().subscribe({
      next: (result) => {
        this.providerList = result        
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addProvider() {    
    this.providerservice.addProvider(
      this.nameProvider, this.addressProvider).subscribe()   
    this.mostrarModal = false;
    
    
  }

  mostrarComoModal() {   
    this.mostrarModal=true;        
  }

  cerrarModal() {
    this.mostrarModal=false;
  }

}
