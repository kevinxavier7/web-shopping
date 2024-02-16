import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ShoppingService } from '../../services/shopping.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProviderService } from '../../services/provider.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [SidebarComponent, DatePipe,FormsModule, FontAwesomeModule, RouterLink, RouterOutlet],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.css'
})
export class ShoppingComponent {

  square = faPenSquare;
  trash = faTrash;
  shoppingId:number =0;
  shoppingList: any[] = [];
  providerId:number=0;
  productId:number =0;
  document:string='';
  amount:number=0;
  price:number=0;
  created:Date = new Date();
  productList:[]=[];
  providerList:[]=[];
  shoppingEdit= {
    "id":0,
    "amount":0,    
    "price":0,
    "date": new Date(),   
    "productId":0,
    "productName":'',
    "providerId":0,
    "providerName":'',    
    "productMake":'',
    "document":''
    }
  
  
  constructor(private shoppingservice: ShoppingService,
    private productservice:ProductService, private providerservice: ProviderService) { }
  

  mostrarModal:boolean = false;
  modalEdit:boolean = false;
  modalDelete:boolean = false;

  ngOnInit(): void {
    this.getShopping();
    
  }  

  getShopping() {
    this.shoppingservice.getShopping().subscribe({
      next: (result) => {       
        this.shoppingList = result       
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  selectChange(event:any):string {
    const target = event.target as HTMLSelectElement;    
    return target.value;
  }
  
  selectProvider(event:any):void{
    this.providerId = parseInt(this.selectChange(event))
    console.log(this.providerId)
       
  }

  selectProduct(event:any):void{
    this.productId = parseInt(this.selectChange(event)) 
    console.log(this.productId)  
 
  }  
  
  addShopping() {      
    var datetime:Date;
    var datetime = new Date(this.created)     
    this.shoppingservice.addShopping(
      this.providerId, this.productId,this.document,this.amount,
      this.price, datetime
       ).subscribe({
        next:()=>{                
        },
        error:(e)=>{
          console.log(e)
        }
       })   
    this.mostrarModal = false;    
  } 

  getProviderProduct(){
    this.productservice.getProduct().subscribe({
      next:(result)=>{        
        this.productList=result;        
      },
      error:(e)=>{
        console.log(e)
      }
    })
    this.providerservice.getProvider().subscribe({
      next:(result)=>{
        this.providerList=result;        
      },
      error:(e)=>{
        console.log(e)
      }
    })

  }

  mostrarComoModal() {    
    this.getProviderProduct() 
    this.mostrarModal=true;;            
  }

  cerrarModal() {
    this.mostrarModal=false;
  }

  mostrarModalEdit(){
    this.modalEdit=true;
  }

  cerrarModalEdit(){
    this.modalEdit=false;
  }

  editShopping(){
    var datetime:Date;
    var datetime = new Date(this.shoppingEdit.date)
    if(this.providerId==0){      
      this.providerId = this.shoppingEdit.providerId
    } if(this.productId==0){
      this.productId= this.shoppingEdit.productId
    }     
    this.shoppingservice.editShopping(this.shoppingEdit.id,
      this.providerId, this.productId,
      this.shoppingEdit.document,this.shoppingEdit.amount,
      this.shoppingEdit.price, datetime
       ).subscribe({
        next:()=>{                     
        },
        error:(e)=>{
          console.log(e)
        }
       }) 
    
    this.modalEdit = false;
    this.shoppingservice.reloaded();   
  } 

  showEdit(e:Event, index:number){
    e.preventDefault(); 
    this.getProviderProduct()   
    this.shoppingEdit = this.shoppingList[index]    
    this.modalEdit=true;       
  } 
    

  deleteShopping(event:Event, id:number){     
    this.shoppingservice.deleteShopping(id).subscribe({
      next:()=>{                
      },
      error:(e)=>{
        console.log(e)
      }
    });     
  }  

} 
