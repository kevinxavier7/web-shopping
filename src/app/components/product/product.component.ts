import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productList: any[] = [];
  nameProduct:string ='';
  makeProduct:string ='';   

  constructor(private productservice: ProductService) { }

  mostrarModal:boolean = false;

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.productservice.getProduct().subscribe({
      next: (result) => {
        this.productList = result
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addProduct() {    
    this.productservice.addProduct(
      this.nameProduct, this.makeProduct).subscribe()   
    this.mostrarModal = false;
    
    
  }

  mostrarComoModal() {   
    this.mostrarModal=true;        
  }

  cerrarModal() {
    this.mostrarModal=false;
  }



}
