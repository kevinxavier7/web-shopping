import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';;
import { ProductComponent } from './components/product/product.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ShoppingComponent } from './components/shopping/shopping.component';

export const routes: Routes = [
    {path: 'products', component: ProductComponent},
    {path: '', component: SidebarComponent},
    {path:'providers', component: ProviderComponent},
    {path:'shopping', component: ShoppingComponent}
];
 