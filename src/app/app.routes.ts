import { Routes } from '@angular/router';
import { ClientsListComponent } from './pages/clients/list/list.component';
import { CreateClientComponent } from './pages/clients/create/create.component';
import { ProductsListComponent } from './pages/products/list/list.component';
import { ProductsCreateComponent } from './pages/products/create/create.component';
import { OrdersListComponent } from './pages/orders/list/list.component';
import { OrdersCreateComponent } from './pages/orders/create/create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsListComponent },
  { path: 'clients/create', component: CreateClientComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/create', component: ProductsCreateComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'orders/create', component: OrdersCreateComponent },
  { path: '**', redirectTo: '' }
];
